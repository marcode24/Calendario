const d = document;
const $btnSearch = d.getElementById('btnSearchCalendar');

const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
]
const $selectMonth =  d.getElementById('selectMonth');
const displayMonths = () => {
    for(let month of months) {
        const option = d.createElement('option');
        option.textContent = month;
        option.value = month
        $selectMonth.appendChild(option);
    }
}
displayMonths();

let monthSelected = 'Enero';
const changeMonthSelected = (month) => {
    monthSelected = month;
}

$btnSearch.addEventListener('click', (e) => {
    createCalendar();
})

const createCalendar = () => {
    const $yearToSearch = Number(d.getElementById('txtYear').value);
    if($yearToSearch < 1940) {
        return window.alert('Año debe ser mayor a 1940')
    }
    const monthSelectedIndex = months.findIndex(el => el == monthSelected);
    console.log(monthSelectedIndex);
    const getMonth = new Date($yearToSearch, monthSelectedIndex, 1);
    const getDayNumber = getMonth.getDay();
    const getDayName = days.find((el, index) => index === getDayNumber);
    const $myCalendarHead = d.getElementById('myCalendarHead');
    const $myCalendarBody = d.getElementById('myCalendarBody');
    const $myCalendar = d.getElementById('myCalendar');
    const trHead = d.createElement('tr');
    console.log(getMonth);
    for(let i = 0; i < 7; i++) {
        const th = d.createElement('th');
        th.textContent = days[i];
        trHead.appendChild(th);
    }
    $myCalendarHead.appendChild(trHead);
    let daysCreated = 0;
    for(let i = 0; i < 7; i++) {
        const tr = d.createElement('tr');
        for(let j = 0; j < 5; j++) {
            if(j = 0) {
                console.log(GetDayNumber);
                const difference = 0
            }
            const th = d.createElement('th');
            th.textContent += daysCreated;
            daysCreated++;
            tr.appendChild(th);
        }
        $myCalendarBody.appendChild(tr);
    }
    console.log($myCalendar);
};