/* =====================================================
   SMART DUTY PRO
   VERSION 2
===================================================== */


/* ================= ACCOUNTS ================= */

const accounts = {

    teacher: {
        password: "1234",
        name: "คุณครู",
        role: "teacher",
        roleName: "👨‍🏫 ครู"
    },

    leader: {
        password: "1234",
        name: "หัวหน้าเวร",
        role: "leader",
        roleName: "👑 หัวหน้าเวร"
    },

    student: {
        password: "1234",
        name: "สมชาย ใจดี",
        role: "student",
        roleName: "👨‍🎓 นักเรียน"
    }

};


/* ================= DATA ================= */

let students = [

    {
        id: "65001",
        name: "สมชาย ใจดี"
    },

    {
        id: "65002",
        name: "สมหญิง เก่งมาก"
    },

    {
        id: "65003",
        name: "กิตติ ตั้งใจ"
    },

    {
        id: "65004",
        name: "นภัส ร่าเริง"
    },

    {
        id: "65005",
        name: "พีรพัฒน์ ขยัน"
    }

];


let duties = [

    {
        id: 1,
        date: "วันนี้",
        student: "สมชาย ใจดี",
        status: "waiting"
    },

    {
        id: 2,
        date: "วันนี้",
        student: "สมหญิง เก่งมาก",
        status: "waiting"
    },

    {
        id: 3,
        date: "พรุ่งนี้",
        student: "กิตติ ตั้งใจ",
        status: "waiting"
    },

    {
        id: 4,
        date: "พรุ่งนี้",
        student: "นภัส ร่าเริง",
        status: "waiting"
    },

    {
        id: 5,
        date: "วันถัดไป",
        student: "พีรพัฒน์ ขยัน",
        status: "waiting"
    }

];


let requests = JSON.parse(
    localStorage.getItem("smartDutyRequests") || "[]"
);


let currentUser = null;


/* ================= LOGIN ================= */

function login() {

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value;

    const error =
        document.getElementById("loginError");


    const account = accounts[username];


    if (!account || account.password !== password) {

        error.innerText =
            "❌ ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";

        return;
    }


    currentUser = {
        username,
        ...account
    };


    document
        .getElementById("loginPage")
        .classList.add("hidden");


    document
        .getElementById("app")
        .classList.remove("hidden");


    document
        .getElementById("profileName")
        .innerText =
        currentUser.name;


    document
        .getElementById("profileRole")
        .innerText =
        currentUser.roleName;


    error.innerText = "";


    showPage("dashboard");

}


/* ================= LOGOUT ================= */

function logout() {

    currentUser = null;

    document
        .getElementById("app")
        .classList.add("hidden");


    document
        .getElementById("loginPage")
        .classList.remove("hidden");


    document
        .getElementById("username")
        .value = "";


    document
        .getElementById("password")
        .value = "";

}


/* ================= PAGE ================= */

function showPage(page) {

    const titles = {

        dashboard: "ภาพรวมระบบ",

        duties: "ตารางเวร",

        check: "ตรวจเวร",

        requests: "คำร้อง",

        students: "รายชื่อนักเรียน",

        reports: "รายงาน"

    };


    document
        .getElementById("pageTitle")
        .innerText =
        titles[page];


    if (page === "dashboard")
        dashboard();


    if (page === "duties")
        dutyPage();


    if (page === "check")
        checkPage();


    if (page === "requests")
        requestPage();


    if (page === "students")
        studentPage();


    if (page === "reports")
        reportPage();

}


/* ================= DASHBOARD ================= */

function dashboard() {

    const done =
        duties.filter(
            x => x.status === "done"
        ).length;


    const bad =
        duties.filter(
            x => x.status === "bad"
        ).length;


    const waiting =
        duties.filter(
            x => x.status === "waiting"
        ).length;


    const pending =
        requests.filter(
            x => x.status === "pending"
        ).length;


    document.getElementById("content").innerHTML = `

        <div class="cards">

            <div class="card">

                <div class="card-icon">
                    👥
                </div>

                <div class="card-title">
                    นักเรียน
                </div>

                <div class="card-number">
                    ${students.length}
                </div>

            </div>


            <div class="card">

                <div class="card-icon">
                    📅
                </div>

                <div class="card-title">
                    งานเวร
                </div>

                <div class="card-number">
                    ${duties.length}
                </div>

            </div>


            <div class="card">

                <div class="card-icon">
                    ✓
                </div>

                <div class="card-title">
                    ทำแล้ว
                </div>

                <div class="card-number">
                    ${done}
                </div>

            </div>


            <div class="card">

                <div class="card-icon">
                    📝
                </div>

                <div class="card-title">
                    คำร้องรออนุมัติ
                </div>

                <div class="card-number">
                    ${pending}
                </div>

            </div>

        </div>


        <div class="dashboard-grid">

            <div class="panel">

                <h3>
                    📋 งานเวรล่าสุด
                </h3>

                ${duties.map(d => `

                    <p>

                        ${d.date}
                        —
                        ${d.student}

                        <span class="status ${d.status}">

                            ${statusText(d.status)}

                        </span>

                    </p>

                `).join("")}

            </div>


            <div class="panel">

                <h3>
                    📌 สถานะระบบ
                </h3>

                <p>
                    ✓ ทำแล้ว:
                    <b>${done}</b>
                </p>

                <p>
                    ✗ ไม่ทำ:
                    <b>${bad}</b>
                </p>

                <p>
                    ⏳ รอตรวจ:
                    <b>${waiting}</b>
                </p>

                <p>
                    📝 คำร้อง:
                    <b>${requests.length}</b>
                </p>

            </div>

        </div>

    `;

}


/* ================= DUTY ================= */

function dutyPage() {

    document.getElementById("content").innerHTML = `

        <div class="panel">

            <h3>
                📅 ตารางเวร
            </h3>

            <div class="table-wrapper">

                <table>

                    <tr>

                        <th>
                            วันที่
                        </th>

                        <th>
                            นักเรียน
                        </th>

                        <th>
                            สถานะ
                        </th>

                    </tr>


                    ${duties.map(d => `

                        <tr>

                            <td>
                                ${d.date}
                            </td>

                            <td>
                                ${d.student}
                            </td>

                            <td>

                                <span
                                    class="status ${d.status}"
                                >

                                    ${statusText(d.status)}

                                </span>

                            </td>

                        </tr>

                    `).join("")}

                </table>

            </div>

        </div>

    `;

}


/* ================= CHECK DUTY ================= */

function checkPage() {

    if (
        currentUser.role !== "teacher" &&
        currentUser.role !== "leader"
    ) {

        document.getElementById("content").innerHTML = `

            <div class="panel">

                <h3>
                    🔒 ไม่มีสิทธิ์
                </h3>

                <p>
                    หน้านี้สำหรับครูและหัวหน้าเวร
                </p>

            </div>

        `;

        return;
    }


    document.getElementById("content").innerHTML = `

        <div class="panel">

            <h3>
                ✅ ตรวจเวรนักเรียน
            </h3>

            <div class="table-wrapper">

                <table>

                    <tr>

                        <th>
                            วันที่
                        </th>

                        <th>
                            นักเรียน
                        </th>

                        <th>
                            สถานะ
                        </th>

                        <th>
                            จัดการ
                        </th>

                    </tr>


                    ${duties.map((d, index) => `

                        <tr>

                            <td>
                                ${d.date}
                            </td>

                            <td>
                                ${d.student}
                            </td>

                            <td>

                                <span
                                    class="status ${d.status}"
                                >

                                    ${statusText(d.status)}

                                </span>

                            </td>

                            <td>

                                <button
                                    class="btn green"
                                    onclick="
                                        setDuty(
                                            ${index},
                                            'done'
                                        )
                                    "
                                >
                                    ✓ ทำแล้ว
                                </button>


                                <button
                                    class="btn red"
                                    onclick="
                                        setDuty(
                                            ${index},
                                            'bad'
                                        )
                                    "
                                >
                                    ✗ ไม่ทำ
                                </button>

                            </td>

                        </tr>

                    `).join("")}

                </table>

            </div>

        </div>

    `;

}


/* ================= SET DUTY ================= */

function setDuty(index, status) {

    duties[index].status = status;

    showPage("check");

}


/* ================= STATUS ================= */

function statusText(status) {

    if (status === "done")
        return "ทำแล้ว";

    if (status === "bad")
        return "ไม่ทำเวร";

    return "รอตรวจ";

}


/* ================= REQUEST PAGE ================= */

function requestPage() {

    let html = `

        <div class="panel">

            <h3>
                📝 ระบบคำร้อง
            </h3>

    `;


    /* STUDENT */

    if (currentUser.role === "student") {

        html += `

            <div class="request">

                <b>
                    ส่งคำร้องขอหยุดเวร
                </b>

                <br><br>

                <textarea
                    id="requestReason"
                    rows="4"
                    placeholder="กรอกเหตุผล เช่น ไม่สบาย / มีกิจกรรมโรงเรียน"
                ></textarea>


                <button
                    class="btn"
                    onclick="sendRequest()"
                >
                    📤 ส่งคำร้อง
                </button>

            </div>

        `;

    }


    /* REQUEST LIST */

    html += `

        <h3>
            📋 รายการคำร้อง
        </h3>

    `;


    if (requests.length === 0) {

        html += `
            <p>
                ยังไม่มีคำร้อง
            </p>
        `;

    }


    requests.forEach((r, index) => {

        html += `

            <div class="request">

                <b>
                    👤 ${r.student}
                </b>

                <p>
                    ${r.reason}
                </p>


                <span
                    class="status
                    ${
                        r.status === "approved"
                        ? "done"
                        :
                        r.status === "rejected"
                        ? "bad"
                        :
                        "waiting"
                    }"
                >

                    ${requestStatus(r.status)}

                </span>


        `;


        /* TEACHER BUTTONS */

        if (
            currentUser.role === "teacher" &&
            r.status === "pending"
        ) {

            html += `

                <div class="request-actions">

                    <button
                        class="btn green"
                        onclick="
                            approveRequest(
                                ${index},
                                'approved'
                            )
                        "
                    >
                        ✅ อนุมัติ
                    </button>


                    <button
                        class="btn red"
                        onclick="
                            approveRequest(
                                ${index},
                                'rejected'
                            )
                        "
                    >
                        ❌ ไม่อนุมัติ
                    </button>

                </div>

            `;

        }


        html += `

            </div>

        `;

    });


    html += `</div>`;


    document.getElementById("content")
        .innerHTML = html;

}


/* ================= SEND REQUEST ================= */

function sendRequest() {

    const reason =
        document
            .getElementById("requestReason")
            .value
            .trim();


    if (!reason) {

        alert(
            "กรุณากรอกเหตุผลก่อนส่งคำร้อง"
        );

        return;
    }


    requests.push({

        student:
            currentUser.name,

        reason: reason,

        status: "pending",

        date:
            new Date()
                .toLocaleString("th-TH")

    });


    saveRequests();


    alert(
        "ส่งคำร้องเรียบร้อยแล้ว"
    );


    requestPage();

}


/* ================= APPROVE ================= */

function approveRequest(index, status) {

    if (currentUser.role !== "teacher") {

        alert(
            "เฉพาะครูเท่านั้นที่สามารถอนุมัติคำร้องได้"
        );

        return;
    }


    requests[index].status = status;

    requests[index].approvedBy =
        currentUser.name;


    saveRequests();


    alert(
        status === "approved"
        ? "✅ อนุมัติคำร้องเรียบร้อย"
        : "❌ ไม่อนุมัติคำร้อง"
    );


    requestPage();

}


/* ================= REQUEST STATUS ================= */

function requestStatus(status) {

    if (status === "approved")
        return "อนุมัติแล้ว";

    if (status === "rejected")
        return "ไม่อนุมัติ";

    return "รออนุมัติ";

}


/* ================= SAVE ================= */

function saveRequests() {

    localStorage.setItem(
        "smartDutyRequests",
        JSON.stringify(requests)
    );

}


/* ================= STUDENTS ================= */

function studentPage() {

    document.getElementById("content").innerHTML = `

        <div class="panel">

            <h3>
                👥 รายชื่อนักเรียน
            </h3>

            <div class="table-wrapper">

                <table>

                    <tr>

                        <th>
                            รหัส
                        </th>

                        <th>
                            ชื่อ
                        </th>

                    </tr>


                    ${students.map(s => `

                        <tr>

                            <td>
                                ${s.id}
                            </td>

                            <td>
                                ${s.name}
                            </td>

                        </tr>

                    `).join("")}

                </table>

            </div>

        </div>

    `;

}


/* ================= REPORT ================= */

function reportPage() {

    const done =
        duties.filter(
            x => x.status === "done"
        ).length;


    const bad =
        duties.filter(
            x => x.status === "bad"
        ).length;


    const waiting =
        duties.filter(
            x => x.status === "waiting"
        ).length;


    const percent =
        duties.length
        ?
        Math.round(
            done /
            duties.length *
            100
        )
        :
        0;


    document.getElementById("content").innerHTML = `

        <div class="cards">

            <div class="card">

                <div class="card-icon">
                    📈
                </div>

                <div class="card-title">
                    อัตราการทำเวร
                </div>

                <div class="card-number">
                    ${percent}%
                </div>

            </div>


            <div class="card">

                <div class="card-icon">
                    ✓
                </div>

                <div class="card-title">
                    ทำแล้ว
                </div>

                <div class="card-number">
                    ${done}
                </div>

            </div>


            <div class="card">

                <div class="card-icon">
                    ✗
                </div>

                <div class="card-title">
                    ไม่ทำ
                </div>

                <div class="card-number">
                    ${bad}
                </div>

            </div>


            <div class="card">

                <div class="card-icon">
                    ⏳
                </div>

                <div class="card-title">
                    รอตรวจ
                </div>

                <div class="card-number">
                    ${waiting}
                </div>

            </div>

        </div>


        <div class="panel" style="margin-top:20px">

            <h3>
                📊 สรุปผลการปฏิบัติงาน
            </h3>

            <p>
                นักเรียนทั้งหมด:
                <b>${students.length}</b>
            </p>

            <p>
                งานเวรทั้งหมด:
                <b>${duties.length}</b>
            </p>

            <p>
                ทำเวรแล้ว:
                <b>${done}</b>
            </p>

            <p>
                ไม่ทำเวร:
                <b>${bad}</b>
            </p>

            <p>
                รอตรวจ:
                <b>${waiting}</b>
            </p>

        </div>

    `;

}


/* ================= CLOCK ================= */

function updateClock() {

    const now =
        new Date();


    document.getElementById("clock")
        .innerText =
        now.toLocaleString(
            "th-TH"
        );

}


setInterval(
    updateClock,
    1000
);


updateClock();