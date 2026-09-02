/* =========================================================
   STUDENTCAREERHUB
   PLACEMENT ELIGIBILITY CHECKER 2026
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
   These are initial/default calculator rules.
   Actual company criteria can vary by drive, role,
   campus and recruitment year.

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

    /* FIXED: CGPA is on a 0–10 scale */
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

    /* -----------------------------------------
       GET USER VALUES
       ----------------------------------------- */

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


    /* -----------------------------------------
       EDUCATION GAP
       ----------------------------------------- */

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


    /* -----------------------------------------
       GET COMPANY RULES
       ----------------------------------------- */

    const rules = companyRules[company];


    /* -----------------------------------------
       BASIC VALIDATION
       ----------------------------------------- */

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


    /* -----------------------------------------
       VALUE RANGE VALIDATION
       ----------------------------------------- */

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


    if (activeBacklogs < 0 || clearedBacklogs < 0) {

        alert("Backlog values cannot be negative.");

        return;
    }


    /* -----------------------------------------
       RESULT ARRAYS
       ----------------------------------------- */

    const failedCriteria = [];

    const passedCriteria = [];

    const improvements = [];


    /* =================================================
       10th PERCENTAGE
       ================================================= */

    if (tenth >= rules.minTenth) {

        passedCriteria.push(
            `10th Percentage: ${tenth}% ✓`
        );

    }

    else {

        failedCriteria.push(
            `10th percentage is ${tenth}%, but minimum required is ${rules.minTenth}%.`
        );

        improvements.push(
            `Your 10th percentage is below the ${rules.minTenth}% requirement. Look for companies with lower academic cut-offs.`
        );

    }


    /* =================================================
       12th PERCENTAGE
       ================================================= */

    if (twelfth >= rules.minTwelfth) {

        passedCriteria.push(
            `12th Percentage: ${twelfth}% ✓`
        );

    }

    else {

        failedCriteria.push(
            `12th percentage is ${twelfth}%, but minimum required is ${rules.minTwelfth}%.`
        );

        improvements.push(
            `Your 12th percentage is below the ${rules.minTwelfth}% requirement.`
        );

    }


    /* =================================================
       CGPA
       ================================================= */

    if (cgpa >= rules.minCGPA) {

        passedCriteria.push(
            `CGPA: ${cgpa} ✓`
        );

    }

    else {

        const cgpaShortfall =
            (rules.minCGPA - cgpa).toFixed(2);

        failedCriteria.push(
            `Your CGPA is ${cgpa}, but minimum required is ${rules.minCGPA}.`
        );

        improvements.push(
            `Your CGPA is ${cgpaShortfall} points below the calculator requirement of ${rules.minCGPA}.`
        );

    }


    /* =================================================
       ACTIVE BACKLOGS
       ================================================= */

    if (
        activeBacklogs <= rules.maxActiveBacklogs
    ) {

        passedCriteria.push(
            `Active Backlogs: ${activeBacklogs} ✓`
        );

    }

    else {

        failedCriteria.push(
            `You have ${activeBacklogs} active backlog(s), while the calculator rule allows ${rules.maxActiveBacklogs}.`
        );

        improvements.push(
            `Clear your active backlog(s) before applying to companies with zero-active-backlog criteria.`
        );

    }


    /* =================================================
       EDUCATION GAP
       ================================================= */

    if (
        educationGap <= rules.maxEducationGap
    ) {

        passedCriteria.push(
            `Education Gap: ${educationGap} year(s) ✓`
        );

    }

    else {

        failedCriteria.push(
            `Your education gap is ${educationGap} year(s), while the calculator rule allows up to ${rules.maxEducationGap} year(s).`
        );

        improvements.push(
            `Look for recruitment drives that allow a larger education gap.`
        );

    }


    /* =================================================
       FINAL RESULT
       ================================================= */

    let status;
    let statusClass;


    if (failedCriteria.length === 0) {

        status =
            "✅ You appear eligible";

        statusClass =
            "eligible";

    }

    else if (failedCriteria.length <= 2) {

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


    /* =================================================
       DISPLAY STATUS
       ================================================= */

    resultStatus.textContent =
        `${status} for ${rules.name}`;

    resultStatus.className =
        `pec-status-title ${statusClass}`;


    /* =================================================
       CLEAR OLD RESULTS
       ================================================= */

    resultDetails.innerHTML = "";


    /* =================================================
       PROFILE BOX
       ================================================= */

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
    `;

    resultDetails.appendChild(profileBox);


    /* =================================================
       COMPANY CRITERIA BOX
       ================================================= */

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
                Actual recruitment requirements may vary.
            </small>
        </p>
    `;

    resultDetails.appendChild(companyBox);


    /* =================================================
       PASSED CRITERIA
       ================================================= */

    if (passedCriteria.length > 0) {

        const passedBox =
            document.createElement("div");

        passedBox.className =
            "pec-result-item";

        passedBox.innerHTML = `
            <h3>✅ Requirements You Meet</h3>

            <ul>
                ${passedCriteria
                    .map(item => `<li>${item}</li>`)
                    .join("")}
            </ul>
        `;

        resultDetails.appendChild(passedBox);
    }


    /* =================================================
       FAILED CRITERIA
       ================================================= */

    if (failedCriteria.length > 0) {

        const failedBox =
            document.createElement("div");

        failedBox.className =
            "pec-result-item";

        failedBox.innerHTML = `
            <h3>⚠️ Requirements to Check</h3>

            <ul>
                ${failedCriteria
                    .map(item => `<li>${item}</li>`)
                    .join("")}
            </ul>
        `;

        resultDetails.appendChild(failedBox);
    }


    /* =================================================
       IMPROVEMENT SECTION
       ================================================= */

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


    /* =================================================
       SHOW RESULT
       ================================================= */

    resultSection.hidden = false;


    /* =================================================
       SCROLL TO RESULT
       ================================================= */

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
