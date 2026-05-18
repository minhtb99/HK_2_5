$("document").ready(function(){
    $(".li-month-list").click(function() {
        $(".li-month-list").find("div a span").css("color","");
        $(this).find("div a span").css("color","#f0c000");
        var sel_month= $(this).attr("data-month");
        var sel_year= $(this).attr("data-year-cal");
        var sel_day="";
        var data = {
            "sel_month": sel_month,
            "sel_year" : sel_year,
            "sel_day" : sel_day
        };
        data = $.param(data);
        $("#ajxResponse").css("min-height","298px");
        $("#ajxResponse").html("<img style='float: right;  margin-right: 668px; margin-top: 136px;' class='cal-loader' src='https://www.wh-group.com/images/loader.png'>");
        $.ajax({
            method: "POST",
            url: "ajxCalendar.php",
            data: {  "sel_month": sel_month,"sel_year" : sel_year,"sel_day" : sel_day }
        })
            .done(function( retData ) {
                $("#ajxResponse").html(retData);
            });

    });

    $(document).on("click","a.cal-day",function() {
        var sel_day= $(this).attr("data-d");
        var sel_month= $(this).attr("data-m");
        var sel_year= $(this).attr("data-y");
        var data = {
            "sel_month": sel_month,
            "sel_year" : sel_year,
            "sel_day" : sel_day
        };
        data = $.param(data);
        $("#eventList").css("min-height","298px");
        $("#eventList").html("<img style='float: right;  margin-right: 668px; margin-top: 136px;' class='cal-loader' src='https://www.wh-group.com/images/loader.png'>");
        $.ajax({
            method: "POST",
            url: "ajxCalendarEventList.php",
            data: {  "sel_month": sel_month,"sel_year" : sel_year,"sel_day" : sel_day }
        })
            .done(function( retData ) {
                $("#eventList").html(retData);
            });
    });

    $(document).on("click","a.m-prev,a.m-next",function() { 
        var sel_month= $(this).attr("data-m");
        var sel_year= $(this).attr("data-y");
        var data = {
            "sel_month": sel_month,
            "sel_year" : sel_year
        };
        data = $.param(data);
        $("#irCalendar").html("<img style='margin-top: 62px;margin-left: 168px;' class='cal-loader' src='https://www.wh-group.com/images/loader.png'>");
        $("#irCalendarEvents").html('');
        $.ajax({
            method: "POST",
            url: "ajxIRCalendar.php",
            data: {  "sel_month": sel_month,"sel_year" : sel_year}
        })
            .done(function( retData ) {
                $("#irCalendar").html(retData);
            });
            $.ajax({
                method: "POST",
                url: "ajxIRCalendarShowDate.php",
                data: {  "sel_month": sel_month,"sel_year" : sel_year}
            })
                .done(function( retData1 ) {
                       var dateData= retData1.split("==");
                       $("#curDate").html(dateData[0]+"&nbsp;"+dateData[1]);
                       $(".m-prev").attr("data-y",dateData[2]);
                       $(".m-prev").attr("data-m",dateData[3]);
                       $(".m-next").attr("data-y",dateData[4]);
                       $(".m-next").attr("data-m",dateData[5]);
                       $("#irCalendarEvents").html(dateData[6]);
                });  
    });
});