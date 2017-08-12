import jQuery from 'jquery';

export const zetaMain = (function ($) {
    $(function () {
        $.ajax({
            url: './profile-data.json',
            method: 'GET',
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function (data) {
                console.log(data);

                if (data.profiles && data.profiles.length) {
                    for (var i in data.profiles) {
                        var trObj = $('<tr>');
                        var proImgClass = 'td-prof-img ';
                        if (data.profiles[i].featured) {
                            proImgClass += 'featured'
                        }
                        trObj.append(
                            $('<td>').addClass(proImgClass).append(
                                $('<img>').attr({
                                    src: (data.profiles[i].image) ? data.profiles[i].image: ''
                                })
                            )
                        )
                        trObj.append(
                            $('<td>').append(
                                $('<h4>').text(data.profiles[i].name)
                            )
                        )
                        var profObj = $('<td>').addClass('text-light');
                        if (data.profiles[i].tag) {
                            var tagClass = 'zt-label ';
                            switch (data.profiles[i].type) {
                                case 'generic':
                                    tagClass += 'zt-label-primary'
                                    break;
                                case 'productive':
                                    tagClass += 'zt-label-error'
                                    break;
                                case 'programatic':
                                    tagClass += 'zt-label-warning'
                                    break;
                                case 'creative':
                                    tagClass += 'zt-label-success'
                                    break;
                                default:
                                    tagClass += 'zt-label-primary'
                            }
                            profObj.append(
                                $('<label>').addClass(tagClass).text((data.profiles[i].tag).toUpperCase())
                            )
                        }
                        profObj.append(data.profiles[i].interest);
                        trObj.append(profObj)
                        trObj.append(
                            $('<td>').addClass('prof-datetime').append(
                                filterDate(data.profiles[i].created)
                            )
                        )
                        $('#zt-inbox-table').append(trObj);
                    }
                }
            },
            error: function (error) {
                console.log(error);
            },
        })

        function filterDate(date) {
            var dateTime = '';
            var now = new Date();
            var theDate = new Date(date);
            var dateDiff = now.getDate() - theDate.getDate();
            var time = formatTime(theDate);

            if (dateDiff == 0) {
                dateTime += 'Today ' + time;
            } else if (dateDiff == 1) {
                dateTime += 'Yesterday ' + time;
            } else {
                dateTime += formatDate(theDate);
            }
            return dateTime;
        }
        function formatDate(date) {
            var day = parseInt(date.getDate());
            var monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            var suffix = '';
            if (day in [11, 12, 13]) {
                suffix += 'th';
            } else if (day % 10 == 1) {
                suffix += 'st';
            } else if (day % 10 == 2) {
                suffix += 'nd';
            } else if (day % 10 == 3) {
                suffix += 'rd';
            } else {
                suffix += 'th';
            }
            return day + suffix + ' ' + monthArr[date.getMonth()];
        }
        function formatTime(date) {
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0'+minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;
            return strTime;
        }

        var btnToggler = true;
        $('#zt-ham-btn').on('click', function (e) {
            btnToggler = !btnToggler;
            if (btnToggler) {
                $('#zt-sidebar-col').removeClass('open');
                $(this).removeClass('ham-open');
            } else {
                $('#zt-sidebar-col').addClass('open');
                $(this).addClass('ham-open');
            }
        })
    });
})(jQuery);
