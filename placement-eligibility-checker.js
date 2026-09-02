/* =========================================================
   STUDENTCAREERHUB
   PLACEMENT ELIGIBILITY CHECKER 2026
   COMPLETE VERSION
   ========================================================= */


/* =========================================================
   FORM ELEMENTS
   ========================================================= */

const eligibilityForm =
    document.getElementById("eligibilityForm");

const resultSection =
    document.getElementById("resultSection");

const resultStatus =
    document.getElementById("resultStatus");

const resultDetails =
    document.getElementById("resultDetails");

const improvementSection =
    document.getElementById("improvementSection");

const improvementList =
    document.getElementById("improvementList");


/* =========================================================
   COMPANY ELIGIBILITY RULES
   =========================================================

   IMPORTANT:
   These are calculator/default criteria.
   Actual company requirements may vary by:
   - recruitment drive
   - role
   - campus
   - college
   - recruitment year

   Always verify the official recruitment notification.

   ========================================================= */

const companyRules = {

    TCS: {
        name: "TCS",
        minCGPA: 6.0,
        minTenth: 60,
        minTwelfth: 60,
        maxActiveBacklogs: 0,
        maxEducationGap: 2
    },

    Infosys: {
        name: "Infosys",
        minCGPA: 6.0,
        minTenth: 60,
        minTwelfth: 60,
        maxActiveBacklogs: 0,
        maxEducationGap: 2
    },

    Wipro: {
        name: "Wipro",
        minCGPA: 6.0,
        minTenth: 60,
        minTwelfth: 60,
        maxActiveBacklogs: 0,
        maxEducationGap: 2
    },

    Accenture: {
        name: "Accenture",
        minCGPA: 6.0,
        minTenth: 60,
        minTwelfth: 60,
        maxActiveBacklogs: 0,
        maxEducationGap: 1
    },

    Cognizant: {
        name: "Cognizant",
        minCGPA: 6.0,
        minTenth: 60,
        minTwelfth: 60,
        maxActiveBacklogs: 0,
        maxEducationGap: 2
    },

    Capgemini: {
        name: "Capgemini",
        minCGPA: 6.0,
        minTenth: 60,
        minTwelfth: 60,
        maxActiveBacklogs: 0,
        maxEducationGap: 2
    },

    HCL: {
        name: "HCLTech",
        minCGPA: 6.0,
        minTenth: 60,
        minTwelfth: 60,
        maxActiveBacklogs: 0,
        maxEducationGap: 2
    },

    /* =====================================================
       TECH MAHINDRA FIXED
       CGPA scale is 0–10, NOT 0–100
       ===================================================== */

    "Tech Mahindra": {
        name: "Tech Mahindra",
        minCGPA: 6.0,
        minTenth: 60,
        minTwelfth: 60,
        maxActiveBacklogs: 0,
        maxEducationGap: 2
    },

    Other: {
        name: "General Placement",
        minCGPA: 6.0,
        minTenth: 60,
        minTwelfth: 60,
        maxActiveBacklogs: 0,
        maxEducationGap: 2
    }

};


/* =========================================================
   FORM SUBMIT
   ========================================================= */

eligibilityForm.addEventListener("submit", function (event) {

    event.preventDefault();

    calculateEligibility();

});


/* =========================================================
   MAIN CALCULATION
   ========================================================= */

function calculateEligibility() {

    /* =====================================================
       GET USER VALUES
       ===================================================== */

    const course =
        document.getElementById("course").value;

    const branch =
        document.getElementById("branch").value;

    const graduationYear =
        document.getElementById("graduationYear").value;

    const university =
        document.getElementById("university").value.trim();

    const tenth =
        parseFloat(document.getElementById("tenth").value);

    const twelfth =
        parseFloat(document.getElementById("twelfth").value);

    const cgpa =
        parseFloat(document.getElementById("cgpa").value);

    const activeBacklogs =
        parseInt(document.getElementById("activeBacklogs").value);

    const clearedBacklogs =
        parseInt(document.getElementById("clearedBacklogs").value);

    const educationGapValue =
        document.getElementById("educationGap").value;

    const company =
        document.getElementById("company").value;


    /* =====================================================
       EDUCATION GAP
       ===================================================== */

    let educationGap = 0;

    if (educationGapValue === "1") {
        educationGap = 1;
    }

    else if (educationGapValue === "2") {
        educationGap = 2;
    }

    else if (educationGapValue === "3+") {
        educationGap = 3;
    }


    /* =====================================================
       COMPANY RULES
       ===================================================== */

    const rules = companyRules[company];

    if (!rules) {

        alert("Please select a valid company.");

        return;
    }


    /* =====================================================
       REQUIRED FIELD VALIDATION
       ===================================================== */

    if (
        !course ||
        !branch ||
        !graduationYear ||
        !university ||
        isNaN(tenth) ||
        isNaN(twelfth) ||
        isNaN(cgpa) ||
        isNaN(activeBacklogs) ||
        isNaN(clearedBacklogs) ||
        !educationGapValue ||
        !company
    ) {

        alert("Please fill all required fields.");

        return;
    }


    /* =====================================================
       VALUE VALIDATION
       ===================================================== */

    if (tenth < 0 || tenth > 100) {

        alert("10th percentage must be between 0 and 100.");

        return;
    }


    if (twelfth < 0 || twelfth > 100) {

        alert("12th percentage must be between 0 and 100.");

        return;
    }


    if (cgpa < 0 || cgpa > 10) {

        alert("CGPA must be between 0 and 10.");

        return;
    }


    if (activeBacklogs < 0) {

        alert("Active backlogs cannot be negative.");

        return;
    }


    if (clearedBacklogs < 0) {

        alert("Cleared backlogs cannot be negative.");

        return;
    }


    /* =====================================================
       RESULT ARRAYS
       ===================================================== */

    const failedCriteria = [];

    const passedCriteria = [];

    const improvements = [];


    /* =====================================================
       10th PERCENTAGE
       ===================================================== */

    if (tenth >= rules.minTenth) {

        passedCriteria.push(
            `10th Percentage: ${tenth}% ✓`
        );

    }

    else {

        const shortfall =
            (rules.minTenth - tenth).toFixed(2);

        failedCriteria.push(
            `Your 10th percentage is ${tenth}%, but the calculator requirement is ${rules.minTenth}%.`
        );

        improvements.push(
            `Your 10th percentage is ${shortfall} percentage point(s) below the calculator requirement.`
        );
    }


    /* =====================================================
       12th PERCENTAGE
       ===================================================== */

    if (twelfth >= rules.minTwelfth) {

        passedCriteria.push(
            `12th Percentage: ${twelfth}% ✓`
        );

    }

    else {

        const shortfall =
            (rules.minTwelfth - twelfth).toFixed(2);

        failedCriteria.push(
            `Your 12th percentage is ${twelfth}%, but the calculator requirement is ${rules.minTwelfth}%.`
        );

        improvements.push(
            `Your 12th percentage is ${shortfall} percentage point(s) below the calculator requirement.`
        );
    }


    /* =====================================================
       CGPA
       ===================================================== */

    if (cgpa >= rules.minCGPA) {

        passedCriteria.push(
            `CGPA: ${cgpa} ✓`
        );

    }

    else {

        const cgpaShortfall =
            (rules.minCGPA - cgpa).toFixed(2);

        failedCriteria.push(
            `Your CGPA is ${cgpa}, but the calculator requirement is ${rules.minCGPA}.`
        );

        improvements.push(
            `Your CGPA is ${cgpaShortfall} point(s) below the calculator requirement of ${rules.minCGPA}.`
        );
    }


    /* =====================================================
       ACTIVE BACKLOGS
       ===================================================== */

    if (
        activeBacklogs <= rules.maxActiveBacklogs
    ) {

        passedCriteria.push(
            `Active Backlogs: ${activeBacklogs} ✓`
        );

    }

    else {

        const extraBacklogs =
            activeBacklogs - rules.maxActiveBacklogs;

        failedCriteria.push(
            `You have ${activeBacklogs} active backlog(s), while the calculator rule allows ${rules.maxActiveBacklogs}.`
        );

        improvements.push(
            `Clear ${extraBacklogs} active backlog(s) to meet this calculator criterion.`
        );
    }


    /* =====================================================
       EDUCATION GAP
       ===================================================== */

    if (
        educationGap <= rules.maxEducationGap
    ) {

        passedCriteria.push(
            `Education Gap: ${educationGap} year(s) ✓`
        );

    }

    else {

        const gapShortfall =
            educationGap - rules.maxEducationGap;

        failedCriteria.push(
            `Your education gap is ${educationGap} year(s), while the calculator rule allows up to ${rules.maxEducationGap} year(s).`
        );

        improvements.push(
            `Your education gap exceeds the calculator limit by ${gapShortfall} year(s). Check drives with different gap criteria.`
        );
    }


    /* =====================================================
       ELIGIBILITY SCORE
       =====================================================

       5 criteria are evaluated:

       10th       = 20 points
       12th       = 20 points
       CGPA       = 20 points
       Backlogs   = 20 points
       Gap        = 20 points

       Total = 100
       ===================================================== */

    const totalCriteria = 5;

    const passedCount =
        passedCriteria.length;

    const failedCount =
        failedCriteria.length;

    const score =
        Math.round(
            (passedCount / totalCriteria) * 100
        );


    /* =====================================================
       FINAL STATUS
       ===================================================== */

    let status;
    let statusClass;

    if (failedCount === 0) {

        status =
            "✅ You appear eligible";

        statusClass =
            "eligible";

    }

    else if (failedCount <= 2) {

        status =
            "⚠️ Check Required";

        statusClass =
            "check-required";

    }

    else {

        status =
            "❌ You may not be eligible";

        statusClass =
            "not-eligible";
    }


    /* =====================================================
       DISPLAY STATUS
       ===================================================== */

    resultStatus.textContent =
        `${status} for ${rules.name}`;

    resultStatus.className =
        `pec-status-title ${statusClass}`;


    /* =====================================================
       CLEAR OLD RESULTS
       ===================================================== */

    resultDetails.innerHTML = "";


    /* =====================================================
       RESULT SUMMARY
       ===================================================== */

    const summaryBox =
        document.createElement("div");

    summaryBox.className =
        "pec-result-item";

    summaryBox.innerHTML = `
        <h3>📊 Eligibility Summary</h3>

        <p>
            <strong>Eligibility Score:</strong>
            ${score}%
        </p>

        <p>
            <strong>Criteria Passed:</strong>
            ${passedCount} / ${totalCriteria}
        </p>

        <p>
            <strong>Criteria to Check:</strong>
            ${failedCount}
        </p>

        <p>
            <strong>Overall Assessment:</strong>
            ${escapeHTML(
                failedCount === 0
                    ? "All calculator criteria are currently met."
                    : "Some calculator criteria need attention before applying."
            )}
        </p>
    `;

    resultDetails.appendChild(summaryBox);


    /* =====================================================
       WHY RESULT?
       ===================================================== */

    const whyBox =
        document.createElement("div");

    whyBox.className =
        "pec-result-item";

    let whyMessage;

    if (failedCount === 0) {

        whyMessage =
            `You meet all ${totalCriteria} calculator criteria for ${rules.name}.`;

    }

    else {

        whyMessage =
            `You meet ${passedCount} out of ${totalCriteria} calculator criteria. ${failedCount} criterion/criteria need to be checked.`;
    }

    whyBox.innerHTML = `
        <h3>💡 Why This Result?</h3>

        <p>
            ${escapeHTML(whyMessage)}
        </p>

        <p>
            <small>
                This result is an informational assessment based on
                the calculator's default criteria.
            </small>
        </p>
    `;

    resultDetails.appendChild(whyBox);


    /* =====================================================
       PROFILE BOX
       ===================================================== */

    const profileBox =
        document.createElement("div");

    profileBox.className =
        "pec-result-item";

    profileBox.innerHTML = `
        <h3>👤 Your Profile</h3>

        <p>
            <strong>Course:</strong>
            ${escapeHTML(course)}
        </p>

        <p>
            <strong>Branch:</strong>
            ${escapeHTML(branch)}
        </p>

        <p>
            <strong>Graduation Year:</strong>
            ${escapeHTML(graduationYear)}
        </p>

        <p>
            <strong>University:</strong>
            ${escapeHTML(university)}
        </p>

        <p>
            <strong>10th:</strong>
            ${tenth}%
        </p>

        <p>
            <strong>12th:</strong>
            ${twelfth}%
        </p>

        <p>
            <strong>CGPA:</strong>
            ${cgpa}
        </p>

        <p>
            <strong>Active Backlogs:</strong>
            ${activeBacklogs}
        </p>

        <p>
            <strong>Cleared Backlogs:</strong>
            ${clearedBacklogs}
        </p>

        <p>
            <strong>Education Gap:</strong>
            ${educationGap} year(s)
        </p>
    `;

    resultDetails.appendChild(profileBox);


    /* =====================================================
       COMPANY CRITERIA BOX
       ===================================================== */

    const companyBox =
        document.createElement("div");

    companyBox.className =
        "pec-result-item";

    companyBox.innerHTML = `
        <h3>🏢 ${escapeHTML(rules.name)} Criteria</h3>

        <p>
            <strong>Minimum CGPA:</strong>
            ${rules.minCGPA}
        </p>

        <p>
            <strong>Minimum 10th:</strong>
            ${rules.minTenth}%
        </p>

        <p>
            <strong>Minimum 12th:</strong>
            ${rules.minTwelfth}%
        </p>

        <p>
            <strong>Maximum Active Backlogs:</strong>
            ${rules.maxActiveBacklogs}
        </p>

        <p>
            <strong>Maximum Education Gap:</strong>
            ${rules.maxEducationGap} year(s)
        </p>

        <p>
            <small>
                These are calculator/default criteria.
                Actual recruitment requirements may vary
                by drive, role, campus, college and year.
            </small>
        </p>
    `;

    resultDetails.appendChild(companyBox);


    /* =====================================================
       PASSED CRITERIA
       ===================================================== */

    if (passedCriteria.length > 0) {

        const passedBox =
            document.createElement("div");

        passedBox.className =
            "pec-result-item";

        passedBox.innerHTML = `
            <h3>✅ Requirements You Meet</h3>

            <ul>
                ${passedCriteria
                    .map(item =>
                        `<li>${escapeHTML(item)}</li>`
                    )
                    .join("")}
            </ul>
        `;

        resultDetails.appendChild(passedBox);
    }


    /* =====================================================
       FAILED CRITERIA
       ===================================================== */

    if (failedCriteria.length > 0) {

        const failedBox =
            document.createElement("div");

        failedBox.className =
            "pec-result-item";

        failedBox.innerHTML = `
            <h3>⚠️ Requirements to Check</h3>

            <ul>
                ${failedCriteria
                    .map(item =>
                        `<li>${escapeHTML(item)}</li>`
                    )
                    .join("")}
            </ul>
        `;

        resultDetails.appendChild(failedBox);
    }


    /* =====================================================
       IMPROVEMENT SECTION
       ===================================================== */

    improvementList.innerHTML = "";

    if (improvements.length > 0) {

        improvementSection.hidden = false;

        improvements.forEach(function (item) {

            const li =
                document.createElement("li");

            li.className =
                "pec-improvement-item";

            li.textContent =
                item;

            improvementList.appendChild(li);

        });

    }

    else {

        improvementSection.hidden = true;

    }


    /* =====================================================
       SUCCESS MESSAGE
       ===================================================== */

    if (failedCount === 0) {

        const successBox =
            document.createElement("div");

        successBox.className =
            "pec-result-item";

        successBox.innerHTML = `
            <h3>🎉 Good News!</h3>

            <p>
                Your profile meets all the calculator criteria
                currently selected for ${escapeHTML(rules.name)}.
            </p>

            <p>
                <small>
                    Always verify the latest official recruitment
                    notification before applying.
                </small>
            </p>
        `;

        resultDetails.appendChild(successBox);
    }


    /* =====================================================
       SHOW RESULT
       ===================================================== */

    resultSection.hidden = false;


    /* =====================================================
       SCROLL TO RESULT
       ===================================================== */

    resultSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =========================================================
   SECURITY HELPER
   ========================================================= */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}
