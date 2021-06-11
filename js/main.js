let months = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
let weekDays = ["lun","mar","mié","jue","vie","sáb","dom"];
let today = new Date();
let dayNow = today.getDate();
let monthNow = today.getMonth();
let yearNow = today.getFullYear();
let title = document.getElementById("titles");
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
});

$calendarActive.addEventListener('focusout', () => {
    createDate();
});

$calendarActive.addEventListener('keyup', (event) => {
    $miCalendar.style.display = 'none';
    $date = event.target.value;
    $date = $date.split('/');
    if($date.length === 3) {
        let year = Number($date[2]);
        const myMonth = Number($date[1]) - 1;
        if(myMonth < 0 || myMonth > 11) return;
        if(year < 1 ) return;
        $miCalendar.style.display = 'block';
        return createDate();
    }
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
    let myDate = new Date();
    myDate.setTime(start);
    for (i = 1; i < 7; i++) {
        fila = document.getElementById("fila"+i);
        for (j = 0; j<7; j++) {
            let myDay = myDate.getDate()
            let myMonth = myDate.getMonth()
            let year = myDate.getFullYear()
            let celda = fila.getElementsByTagName("td")[j];
            celda.innerHTML = myDay;
            (myMonth === monthCalendar) ? celda.setAttribute('id', myDay) : '';
            (myMonth === monthCalendar) ? celda.setAttribute('onclick', `selectDay(${myDay}, ${myMonth}, ${year})`) : '';
            celda.style.backgroundColor = "#DADDE2";
            celda.style.color = "#492736";
            if (j == 6) {
                celda.style.color = "#f11445";
            }
            if (myMonth != monthCalendar) {
                celda.style.color = "#a0babc";
            }
            if (myMonth == monthNow && myDay == dayNow && year == yearNow ) {
                celda.style.backgroundColor = "#889FA5";
                celda.innerHTML = "<cite title='Fecha Actual'>"+myDay+"</cite>";
            }
            myDay = myDay+1;
            myDate.setDate(myDay);
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
    let time= firtsMonth.getTime()
    time = time + (45*24*60*60*1000)
    newMonth.setTime(time);
    monthCalendar = newMonth.getMonth()
    yearCalendar = newMonth.getFullYear()
    headerCalendar();
    writeDays();
}

function createDate() {
    let $date = document.querySelector('.calendar-active').value;
    $date = $date.split('/');
    let year = Number($date[2]);
    const myMonth = $date[1] - 1;
    myDate = new Date();
    myDate.setMonth(myMonth);
    myDate.setFullYear(year);
    monthCalendar = myDate.getMonth();
    yearCalendar = myDate.getFullYear();
    headerCalendar();
    writeDays();
}

function selectDay(day, month, year) {
    $calendarActive.value = `${day}/${month + 1}/${year}`;
    $miCalendar.style.display = 'none';
}