let months = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
let weekDays = ["lun","mar","mié","jue","vie","sáb","dom"];
let today = new Date();
let dayNow = today.getDate();
let monthNow = today.getMonth();
let yearNow = today.getFullYear();
let title = document.getElementById("titulos");
let beforeMonth = document.getElementById("before");
let afterMonth = document.getElementById("after");
let firtsFila = document.getElementById("fila0");
const $calendarActive = document.querySelector('.calendar-active');
$calendarActive.value = `${dayNow}/${monthNow + 1}/${yearNow}`;
let monthCalendar = monthNow;
let yearCalendar = yearNow;
headerCalendar();
firstLine();
writeDays();

let $miCalendar = document.getElementById('calendar');
$calendarActive.addEventListener('focus', () => {
    createDate();
    $miCalendar.style.display = 'block';
})

$calendarActive.addEventListener('focusout', () => {
    createDate();
})

function headerCalendar() {
    title.innerHTML = `${months[monthCalendar]} ${yearCalendar}`;
    let monthBefore = monthCalendar - 1; //mes anterior
    let monthAfter = monthCalendar + 1; //mes posterior
    if(monthBefore < 0){
        monthBefore = 11;
    }
    if(monthAfter > 11){
        monthAfter = 0;
    }
    beforeMonth.innerHTML = months[monthBefore];
    afterMonth.innerHTML = months[monthAfter];
}

function firstLine() {
    for (i = 0;i < 7; i++) {
        celda0 = firtsFila.getElementsByTagName("th")[i];
        celda0.innerHTML = weekDays[i]
    }
}

function writeDays() {
    firtsMonth = new Date(yearCalendar,monthCalendar, 1)
    prsem = firtsMonth.getDay()
    prsem--;
    if ( prsem == -1){
        prsem = 6;
    }
    let firstDay  = firtsMonth.getDate();
    let prcelda = firstDay - prsem;
    let start = firtsMonth.setDate(prcelda)
    let diames = new Date();
    diames.setTime(start);
    for (i = 1; i < 7; i++) {
        fila = document.getElementById("fila"+i);
        for (j = 0; j<7; j++) {
            let midia = diames.getDate()
            let mimes = diames.getMonth()
            let mianno = diames.getFullYear()
            let celda = fila.getElementsByTagName("td")[j];
            celda.innerHTML = midia;
            (mimes === monthCalendar) ? celda.setAttribute('id', midia) : '';
            (mimes === monthCalendar) ? celda.setAttribute('onclick', `selectDay(${midia}, ${mimes}, ${mianno})`) : '';
            celda.style.backgroundColor = "#DADDE2";
            celda.style.color = "#492736";
            if (j == 6) {
                celda.style.color = "#f11445";
            }
            if (mimes != monthCalendar) {
                celda.style.color = "#a0babc";
            }
            if (mimes == monthNow && midia == dayNow && mianno == yearNow ) {
                celda.style.backgroundColor = "#889FA5";
                celda.innerHTML = "<cite title='Fecha Actual'>"+midia+"</cite>";
            }
            midia = midia+1;
            diames.setDate(midia);
        }
    }
}

function createBeforeMonth() {
    let newMonth = new Date()
    firtsMonth--;
    newMonth.setTime(firtsMonth)
    monthCalendar = newMonth.getMonth()
    yearCalendar = newMonth.getFullYear()
    headerCalendar()
    writeDays()
}

function createAfterMonth() {
    let newMonth = new Date()
    let tiempounix = firtsMonth.getTime()
    tiempounix = tiempounix+(45*24*60*60*1000)
    newMonth.setTime(tiempounix)
    monthCalendar = newMonth.getMonth()
    yearCalendar = newMonth.getFullYear()
    headerCalendar();
    writeDays();
}

function createDate() {
    let $date = document.querySelector('.calendar-active').value;
    $date = $date.split('/');
    let mianno = $date[2];
    const mimes = $date[1] - 1;
    if(isNaN(mianno) || mianno<1) {
        mianno = 2021;
        alert("El año no es válido:\n debe ser un número mayor que 0")
    }
    else {
        mife = new Date();
        mife.setMonth(mimes);
        mife.setFullYear(mianno);
        monthCalendar = mife.getMonth();
        yearCalendar = mife.getFullYear();
        headerCalendar();
        writeDays();
    }
}

function selectDay(day, month, year) {
    $calendarActive.value = `${day}/${month + 1}/${year}`;
    $miCalendar.style.display = 'none';
}