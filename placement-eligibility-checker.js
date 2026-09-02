const eligibilityForm = document.getElementById("eligibilityForm");
const resultSection = document.getElementById("resultSection");
const resultStatus = document.getElementById("resultStatus");
const resultDetails = document.getElementById("resultDetails");
const improvementSection = document.getElementById("improvementSection");
const improvementList = document.getElementById("improvementList");


/* =====================================================
   COMPANY ELIGIBILITY DATABASE
   ===================================================== */

const companyRules = {

    TCS: {
        name: "TCS",
        status: "Verified - Specific Hiring Program",
        source: "TCS All India NQT Hiring",
        sourceUrl: "https://www.tcs.com/careers/india/tcs-all-india-nqt-hiring",

        minCGPA: 6.0,
        minTenth: 60,
        minTwelfth: 60,
        maxActiveBacklogs: 0,
        maxEducationGap: 2,

        note:
            "These criteria correspond to the referenced TCS All India NQT hiring program. Other TCS programs may have different criteria."
    },


    Infosys: {
        name: "Infosys",
        status: "Drive-specific",
        source: "Infosys Careers / Recruitment Notification",
        sourceUrl: "https://www.infosys.com/careers/",

        minCGPA: 6.0,
        minTenth: 60,
        minTwelfth: 60,
        maxActiveBacklogs: 0,
        maxEducationGap: 2,

        note:
            "Indicative criteria only. Verify the latest Infosys recruitment notification for the specific drive."
    },


    Wipro: {
        name: "Wipro",
        status: "Drive-specific",
        source: "Wipro Careers / Recruitment Notification",
        sourceUrl: "https://careers.wipro.com/",

        minCGPA: 6.0,
        minTenth: 60,
        minTwelfth: 60,
        maxActiveBacklogs: 0,
        maxEducationGap: 2,

        note:
            "Indicative criteria only. Wipro eligibility may vary by hiring program, role and graduation batch."
    },


    Accenture: {
        name: "Accenture",
        status: "Role / Drive-specific",
        source: "Accenture Careers",
        sourceUrl: "https://www.accenture.com/in-en/careers",

        minCGPA: 6.0,
        minTenth: 60,
        minTwelfth: 60,
        maxActiveBacklogs: 0,
        maxEducationGap: 1,

        note:
            "Accenture eligibility can vary by job and hiring program. Verify the requirements in the specific job posting."
    },


    Cognizant: {
        name: "Cognizant",
        status: "Program-specific",
        source: "Cognizant GenC / Careers",
        sourceUrl:
            "https://careers.cognizant.com/india-en/pathways-to-cognizant/genc-program/",

        minCGPA: 6.0,
        minTenth: 60,
        minTwelfth: 60,
        maxActiveBacklogs: 0,
        maxEducationGap: 2,

        note:
            "Cognizant runs multiple programs. Verify the current GenC or specific hiring notification before applying."
    },


    Capgemini: {
        name: "Capgemini",
        status: "Drive-specific",
        source: "Capgemini India Careers",
        sourceUrl: "https://www.capgemini.com/in-en/careers/",

        minCGPA: 6.0,
        minTenth: 60,
        minTwelfth: 60,
        maxActiveBacklogs: 0,
        maxEducationGap: 1,

        note:
            "Capgemini eligibility varies by drive. Historical official drives have used different academic and gap criteria."
    },


    HCL: {
        name: "HCLTech",
        status: "Drive-specific",
        source: "HCLTech Careers",
        sourceUrl: "https://careers.hcltech.com/",

        minCGPA: 6.0,
        minTenth: 60,
        minTwelfth: 60,
        maxActiveBacklogs: 0,
        maxEducationGap: 2,

        note:
            "Indicative criteria only. Verify the current HCLTech fresher hiring notification."
    },


    "Tech Mahindra": {
        name: "Tech Mahindra",
        status: "Drive-specific",
        source: "Tech Mahindra Careers",
        sourceUrl: "https://careers.techmahindra.com/",

        minCGPA: 6.0,
        minTenth: 60,
        minTwelfth: 60,
        maxActiveBacklogs: 0,
        maxEducationGap: 2,

        note:
            "Eligibility can vary significantly by Tech Mahindra hiring drive. Verify the specific notification."
    },


    Other: {
        name: "General Placement Estimate",
        status: "General Estimate",
        source: "StudentCareerHub Default Criteria",
        sourceUrl:
            "https://dwivediayush662-lang.github.io/studentcareerhub/",

        minCGPA: 6.0,
        minTenth: 60,
        minTwelfth: 60,
        maxActiveBacklogs: 0,
        maxEducationGap: 2,

        note:
            "This is a general estimate and is not an official company eligibility rule."
    }
};


/* =====================================================
   FORM SUBMIT
   ===================================================== */

eligibilityForm.addEventListener("submit", function (event) {

    event.preventDefault();

    calculateEligibility();

});


/* =====================================================
   MAIN ELIGIBILITY CALCULATOR
   ===================================================== */

function calculateEligibility() {

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


    /* =================================================
       EDUCATION GAP
       ================================================= */

    let educationGap = 0;

    if (educationGapValue === "1") {

        educationGap = 1;

    } else if (educationGapValue === "2") {

        educationGap = 2;

    } else if (educationGapValue === "3+") {

        educationGap = 3;

    }


    /* =================================================
       COMPANY CHECK
       ================================================= */

    const rules = companyRules[company];

    if (!rules) {

        alert("Please select a valid company.");

        return;

    }


    /* =================================================
       REQUIRED FIELD VALIDATION
       ================================================= */

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


    /* =================================================
       VALUE VALIDATION
       ================================================= */

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


    /* =================================================
       RESULT ARRAYS
       ================================================= */

    const failedCriteria = [];
    const passedCriteria = [];
    const improvements = [];


    /* =================================================
       10th CHECK
       ================================================= */

    if (tenth >= rules.minTenth) {

        passedCriteria.push(
            `10th Percentage: ${tenth}% ✓`
        );

    } else {

        const shortfall =
            (rules.minTenth - tenth).toFixed(2);

        failedCriteria.push(
            `Your 10th percentage is ${tenth}%, but the calculator requirement is ${rules.minTenth}%.`
        );

        improvements.push(
            `Your 10th percentage is ${shortfall} percentage point(s) below the calculator requirement.`
        );

    }


    /* =================================================
       12th CHECK
       ================================================= */

    if (twelfth >= rules.minTwelfth) {

        passedCriteria.push(
            `12th Percentage: ${twelfth}% ✓`
        );

    } else {

        const shortfall =
            (rules.minTwelfth - twelfth).toFixed(2);

        failedCriteria.push(
            `Your 12th percentage is ${twelfth}%, but the calculator requirement is ${rules.minTwelfth}%.`
        );

        improvements.push(
            `Your 12th percentage is ${shortfall} percentage point(s) below the calculator requirement.`
        );

    }


    /* =================================================
       CGPA CHECK
       ================================================= */

    if (cgpa >= rules.minCGPA) {

        passedCriteria.push(
            `CGPA: ${cgpa} ✓`
        );

    } else {

        const cgpaShortfall =
            (rules.minCGPA - cgpa).toFixed(2);

        failedCriteria.push(
            `Your CGPA is ${cgpa}, but the calculator requirement is ${rules.minCGPA}.`
        );

        improvements.push(
            `Your CGPA is ${cgpaShortfall} point(s) below the calculator requirement of ${rules.minCGPA}.`
        );

    }


    /* =================================================
       ACTIVE BACKLOG CHECK
       ================================================= */

    if (activeBacklogs <= rules.maxActiveBacklogs) {

        passedCriteria.push(
            `Active Backlogs: ${activeBacklogs} ✓`
        );

    } else {

        const extraBacklogs =
            activeBacklogs - rules.maxActiveBacklogs;

        failedCriteria.push(
            `You have ${activeBacklogs} active backlog(s), while the calculator rule allows ${rules.maxActiveBacklogs}.`
        );

        improvements.push(
            `Clear ${extraBacklogs} active backlog(s) to meet this calculator criterion.`
        );

    }


    /* =================================================
       EDUCATION GAP CHECK
       ================================================= */

    if (educationGap <= rules.maxEducationGap) {

        passedCriteria.push(
            `Education Gap: ${educationGap} year(s) ✓`
        );

    } else {

        const gapShortfall =
            educationGap - rules.maxEducationGap;

        failedCriteria.push(
            `Your education gap is ${educationGap} year(s), while the calculator rule allows ${rules.maxEducationGap} year(s).`
        );

        improvements.push(
            `Your education gap exceeds the calculator limit by ${gapShortfall} year(s). Check drives with different gap criteria.`
        );

    }


    /* =================================================
       SCORE
       ================================================= */

    const totalCriteria = 5;

    const passedCount =
        passedCriteria.length;

    const failedCount =
        failedCriteria.length;

    const score =
        Math.round(
            (passedCount / totalCriteria) * 100
        );


    /* =================================================
       STATUS
       ================================================= */

    let status;
    let statusClass;


    if (failedCount === 0) {

        status = "✅ You appear eligible";

        statusClass = "eligible";

    } else if (failedCount <= 2) {

        status = "⚠️ Check Required";

        statusClass = "check-required";

    } else {

        status = "❌ You may not be eligible";

        statusClass = "not-eligible";

    }


    /* =================================================
       RESULT TITLE
       ================================================= */

    resultStatus.textContent =
        `${status} for ${rules.name}`;

    resultStatus.className =
        `pec-status-title ${statusClass}`;


    resultDetails.innerHTML = "";


    /* =================================================
       ELIGIBILITY SUMMARY
       ================================================= */

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
            ${
                escapeHTML(
                    failedCount === 0
                        ? "All calculator criteria are currently met."
                        : "Some calculator criteria need attention before applying."
                )
            }
        </p>

    `;


    resultDetails.appendChild(summaryBox);


    /* =================================================
       WHY THIS RESULT
       ================================================= */

    const whyBox =
        document.createElement("div");

    whyBox.className =
        "pec-result-item";


    let whyMessage;


    if (failedCount === 0) {

        whyMessage =
            `You meet all ${totalCriteria} calculator criteria for ${rules.name}.`;

    } else {

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
                This result is an informational assessment based on the calculator's criteria.
            </small>
        </p>

    `;


    resultDetails.appendChild(whyBox);


    /* =================================================
       USER PROFILE
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


    /* =================================================
       COMPANY CRITERIA + SOURCE
       ================================================= */

    const companyBox =
        document.createElement("div");

    companyBox.className =
        "pec-result-item";


    companyBox.innerHTML = `

        <h3>
            🏢 ${escapeHTML(rules.name)} Criteria
        </h3>

        <p>
            <strong>Status:</strong>
            ${escapeHTML(rules.status)}
        </p>

        <p>
            <strong>Source:</strong>
            ${escapeHTML(rules.source)}
        </p>

        <hr>

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
                ⚠️ ${escapeHTML(rules.note)}
            </small>
        </p>

        <p>

            <a
                href="${escapeHTML(rules.sourceUrl)}"
                target="_blank"
                rel="noopener noreferrer"
            >
                🔗 Check Official Source / Careers →
            </a>

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

            <h3>
                ✅ Requirements You Meet
            </h3>

            <ul>

                ${passedCriteria
                    .map(
                        item =>
                            `<li>${escapeHTML(item)}</li>`
                    )
                    .join("")
                }

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

            <h3>
                ⚠️ Requirements to Check
            </h3>

            <ul>

                ${failedCriteria
                    .map(
                        item =>
                            `<li>${escapeHTML(item)}</li>`
                    )
                    .join("")
                }

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

    } else {

        improvementSection.hidden = true;

    }


    /* =================================================
       SUCCESS MESSAGE
       ================================================= */

    if (failedCount === 0) {

        const successBox =
            document.createElement("div");

        successBox.className =
            "pec-result-item";


        successBox.innerHTML = `

            <h3>
                🎉 Good News!
            </h3>

            <p>
                Your profile meets all the calculator
                criteria currently selected for
                ${escapeHTML(rules.name)}.
            </p>

            <p>
                <small>
                    Always verify the latest official
                    recruitment notification before applying.
                </small>
            </p>

        `;


        resultDetails.appendChild(successBox);

    }


    /* =================================================
       SHOW RESULT
       ================================================= */

    resultSection.hidden = false;


    resultSection.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}


/* =====================================================
   SECURITY HELPER
   ===================================================== */

function escapeHTML(value) {

    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}
