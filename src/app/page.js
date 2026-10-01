"use client";

import { useState } from "react";

const fields = [
  {
    name: "age",
    label: "Age",
    placeholder: "45",
    min: 1,
    max: 120,
    step: 1,
    unit: "years",
  },
  {
    name: "sex",
    label: "Sex",
    placeholder: "0 or 1",
    min: 0,
    max: 1,
    step: 1,
    hint: "0 = Female • 1 = Male",
  },
  {
    name: "cp",
    label: "Chest Pain Type",
    placeholder: "0 - 3",
    min: 0,
    max: 3,
    step: 1,
    hint: "Value from 0 to 3",
  },
  {
    name: "trestbps",
    label: "Resting Blood Pressure",
    placeholder: "130",
    min: 50,
    max: 250,
    step: 1,
    unit: "mmHg",
  },
  {
    name: "chol",
    label: "Cholesterol",
    placeholder: "220",
    min: 50,
    max: 700,
    step: 1,
    unit: "mg/dL",
  },
  {
    name: "fbs",
    label: "Fasting Blood Sugar",
    placeholder: "0 or 1",
    min: 0,
    max: 1,
    step: 1,
    hint: "0 = No • 1 = Yes",
  },
  {
    name: "restecg",
    label: "Resting ECG",
    placeholder: "0 - 2",
    min: 0,
    max: 2,
    step: 1,
    hint: "Value from 0 to 2",
  },
  {
    name: "thalach",
    label: "Maximum Heart Rate",
    placeholder: "150",
    min: 50,
    max: 250,
    step: 1,
    unit: "BPM",
  },
  {
    name: "exang",
    label: "Exercise Angina",
    placeholder: "0 or 1",
    min: 0,
    max: 1,
    step: 1,
    hint: "0 = No • 1 = Yes",
  },
  {
    name: "oldpeak",
    label: "ST Depression",
    placeholder: "1.2",
    min: 0,
    max: 10,
    step: 0.1,
    unit: "ST",
  },
  {
    name: "slope",
    label: "Slope",
    placeholder: "0 - 2",
    min: 0,
    max: 2,
    step: 1,
    hint: "Value from 0 to 2",
  },
  {
    name: "ca",
    label: "Major Vessels",
    placeholder: "0 - 4",
    min: 0,
    max: 4,
    step: 1,
    hint: "Value from 0 to 4",
  },
  {
    name: "thal",
    label: "Thalassemia",
    placeholder: "0 - 3",
    min: 0,
    max: 3,
    step: 1,
    hint: "Value from 0 to 3",
  },
];

export default function Home() {
  const [form, setForm] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function resetForm() {
    setForm({});
    setResult(null);
  }

  async function predict(event) {
    event.preventDefault();

    setLoading(true);
    setResult(null);

    try {
      const missing = fields.filter(
        (field) =>
          form[field.name] === undefined ||
          form[field.name] === ""
      );

      if (missing.length > 0) {
        throw new Error(
          `Please complete: ${missing
            .map((field) => field.label)
            .join(", ")}`
        );
      }

      const payload = {};

      fields.forEach((field) => {
        payload[field.name] = Number(form[field.name]);
      });

      const response = await fetch(
        "http://127.0.0.1:8000/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const text = await response.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          `Invalid response from backend. HTTP ${response.status}`
        );
      }

      if (!response.ok || data.error) {
        throw new Error(
          data.error ||
            data.detail ||
            "Prediction failed."
        );
      }

      setResult(data);

    } catch (error) {
      setResult({
        error:
          error.message ||
          "Unable to connect to prediction server.",
      });
    } finally {
      setLoading(false);
    }
  }

  const isPositive =
    result && !result.error && result.prediction === 1;

  return (
    <main className="app-shell">

      {/* Background decoration */}
      <div className="bg-glow glow-one"></div>
      <div className="bg-glow glow-two"></div>

      {/* NAVBAR */}
      <nav className="navbar">

        <div className="brand">
          <div className="brand-icon">
            ♥
          </div>

          <div>
            <strong>CardioAI</strong>
            <span>HEALTH INTELLIGENCE</span>
          </div>
        </div>

        <div className="status">
          <span className="status-dot"></span>
          AI SYSTEM ONLINE
        </div>

      </nav>


      {/* HERO */}
      <section className="hero-section">

        <div className="hero-content">

          <div className="hero-badge">
            <span>✦</span>
            MACHINE LEARNING HEALTH ANALYTICS
          </div>

          <h1>
            Understand Your
            <span> Heart Health.</span>
          </h1>

          <p>
            An AI-powered heart disease prediction system
            designed to analyze key cardiovascular parameters
            and generate an estimated prediction.
          </p>

          <div className="hero-stats">

            <div>
              <strong>13</strong>
              <span>Health Factors</span>
            </div>

            <div>
              <strong>ML</strong>
              <span>Prediction Model</span>
            </div>

            <div>
              <strong>AI</strong>
              <span>Powered Analysis</span>
            </div>

          </div>

        </div>


        {/* ECG CARD */}
        <div className="heart-card">

          <div className="heart-card-top">
            <span>LIVE ANALYSIS</span>
            <span className="live-dot"></span>
          </div>

          <div className="heart-symbol">
            ♥
          </div>

          <div className="ecg">
            <svg
              viewBox="0 0 500 100"
              preserveAspectRatio="none"
            >
              <polyline
                points="
                  0,50
                  70,50
                  90,50
                  105,20
                  120,80
                  135,50
                  200,50
                  220,50
                  235,15
                  250,85
                  265,50
                  330,50
                  350,50
                  365,25
                  380,75
                  395,50
                  500,50
                "
              />
            </svg>
          </div>

          <div className="heart-reading">
            <strong>
              {form.thalach || "--"}
            </strong>

            <span>BPM</span>
          </div>

        </div>

      </section>


      {/* MAIN FORM */}
      <section className="dashboard-card">

        <div className="section-heading">

          <div>
            <span className="section-label">
              PATIENT DATA
            </span>

            <h2>
              Cardiovascular Parameters
            </h2>

            <p>
              Enter the patient's clinical parameters
              below for AI analysis.
            </p>
          </div>

          <div className="step-indicator">
            <span>01</span>
            <small>/ 01</small>
          </div>

        </div>


        <form onSubmit={predict}>

          <div className="input-grid">

            {fields.map((field, index) => (
              <div
                className="input-card"
                key={field.name}
              >

                <div className="input-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <label htmlFor={field.name}>
                  {field.label}
                </label>

                <div className="input-wrapper">

                  <input
                    id={field.name}
                    type="number"
                    name={field.name}
                    value={
                      form[field.name] ?? ""
                    }
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    required
                  />

                  {field.unit && (
                    <span className="input-unit">
                      {field.unit}
                    </span>
                  )}

                </div>

                {field.hint && (
                  <small className="input-hint">
                    {field.hint}
                  </small>
                )}

              </div>
            ))}

          </div>


          {/* ACTIONS */}
          <div className="action-area">

            <div className="action-info">
              <span className="secure-icon">
                ✓
              </span>

              <div>
                <strong>
                  Ready for analysis
                </strong>

                <small>
                  Your inputs are processed locally
                  during this demo.
                </small>
              </div>
            </div>


            <div className="actions">

              <button
                type="button"
                className="clear-btn"
                onClick={resetForm}
                disabled={loading}
              >
                Clear
              </button>

              <button
                type="submit"
                className="predict-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Analyzing...
                  </>
                ) : (
                  <>
                    Analyze Heart Health
                    <span className="arrow">
                      →
                    </span>
                  </>
                )}
              </button>

            </div>

          </div>

        </form>

      </section>


      {/* RESULT */}
      {result && (

        <section
          className={`result-card ${
            result.error
              ? "result-error"
              : isPositive
              ? "result-risk"
              : "result-safe"
          }`}
        >

          {result.error ? (

            <div className="error-content">

              <div className="result-icon">
                !
              </div>

              <div>
                <span className="section-label">
                  SYSTEM ERROR
                </span>

                <h2>
                  Prediction Failed
                </h2>

                <p>
                  {result.error}
                </p>
              </div>

            </div>

          ) : (

            <>

              <div className="result-header">

                <div>
                  <span className="section-label">
                    AI ANALYSIS COMPLETE
                  </span>

                  <h2>
                    Prediction Result
                  </h2>
                </div>

                <div className="result-badge">
                  {isPositive
                    ? "ATTENTION"
                    : "LOWER RISK"}
                </div>

              </div>


              <div className="result-body">

                <div className="result-main">

                  <div className="result-heart">
                    ♥
                  </div>

                  <div>
                    <span className="result-caption">
                      MODEL PREDICTION
                    </span>

                    <h3>
                      {result.result}
                    </h3>

                    <p>
                      Based on the parameters
                      provided to the model.
                    </p>
                  </div>

                </div>


                <div className="score-box">

                  <span>
                    ESTIMATED PROBABILITY
                  </span>

                  <strong>
                    {result.probability}%
                  </strong>

                  <div className="score-bar">
                    <div
                      style={{
                        width: `${Math.min(
                          result.probability,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>

                </div>

              </div>


              <div className="medical-warning">

                <span>ⓘ</span>

                <p>
                  This application is an educational
                  machine-learning demonstration. The
                  prediction is not a medical diagnosis
                  and should not replace advice from a
                  qualified healthcare professional.
                </p>

              </div>

            </>

          )}

        </section>

      )}


      {/* FOOTER */}
      <footer className="footer">

        <div>
          <strong>CardioAI</strong>
          <span>
            Machine Learning Health Analytics
          </span>
        </div>

        <p>
          Educational AI Project •
          Heart Disease Prediction
        </p>

      </footer>

    </main>
  );
}