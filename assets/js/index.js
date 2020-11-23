let URL = `https://automation-script-worker.herokuapp.com/scripts/?limit=10&offset=0`;
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
function extractDate(d){
    let day=d.slice(8,10);
    let month=monthNames[d.slice(5,7)-1].slice(0,3);
    console.log(month, " ", day);
    let dateStr=`${month} ${day}`;
    return dateStr;
}

function addDataToDOM(data) {
    for (let i = 0; i < data.results.length; i++) {
        let current = data.results[i];
        console.log(current.added)
        let date=extractDate(current.added);

        const card = ` <div class="card" loading="lazy">
    <div class="card-main">
        <img src="${current.creator_dp}" alt="" class="circular">
        <div class="card-main-text">
            <h2>${current.name}</h2>
            <h3> ${current.made_by}</h3>
            <span class="card-m-b">
                <p>${date}</p>
                <span>
                    <a href="${current.url}" class="card-btn" target="_blank">Download</a>
                    <a href="${current.url}" class="card-btn" target="_blank">View</a>
                </span>
            </span>
        </div>
    </div>
    <div class="card-collapsible hide">
        <div class="hr"></div>
        <div>
            <table>
                <tr>
                    <th>
                    Category: 
                    </th>
                    <td class="cell">
                        ${current.category}
                    </td>
                </tr>
                <tr>
                    <th>
                        Description: 
                    </th>
                    <td>
                        ${current.description}
                    </td>
                </tr>
            </table>
        </div>    
    </div>
    <div class="chevron-c">
        <i class="fas fa-chevron-down"></i>
    </div>
    
    <div class="chevron-c hide">
        <i class="fas fa-chevron-up"></i>
    </div>
</div>`

        $('.container').append(card);
    }
    

    $(`.chevron-c>.fa-chevron-down`).click(function () {
        $(this).parent().siblings('.card-collapsible').removeClass('hide');
        $(this).parent().addClass('hide');
        $(this).parent().siblings('.chevron-c').removeClass('hide')
    })
    $(`.chevron-c>.fa-chevron-up`).click(function () {
        $(this).parent().siblings('.card-collapsible').addClass('hide');
        $(this).parent().addClass('hide');
        $(this).parent().siblings('.chevron-c').removeClass('hide')
    })

}


/*Function to get data*/
function getPost() {
    jQuery.get(URL, function (data, status) {
        addDataToDOM(data);
        URL = data.next;
    });
}

    $('.scroll-top').click(function () {
        $(window).scrollTop(0);
    })
    
    $(function() {
        $('.jscroll').jscroll();    
    });
    
   
/*run the function the first time*/
getPost();
/**/


$(window).scroll(function (event) {
    var scrollTop = $(document).scrollTop();

    /*Hiding and Showing scroll to top button*/
    if (scrollTop > 100) {
        $('.scroll-top').removeClass('hide')

    } else {
        $('.scroll-top').addClass('hide')
    }
    
    /*If almost scrolled to bottom, fetch data again*/
    let winHeight=$(window).height()
    let docHeight= $(document).height()
  
    if(scrollTop+winHeight>=docHeight-100) {
        getPost()
    }

});