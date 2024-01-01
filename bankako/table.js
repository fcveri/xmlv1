$.fn.tablo = function (build) {
//   if(build.api) {
//         await $.getJSON("../api/garantipos", (getJsonData) => {
            
//             build.data = getJsonData.request;
//         })
//     }
    
    
    console.log(build.data);
    // div.sui-gridheader.sui-scrolldiv
    // div.sui-suiheadercontent
    // table.sui-table sui-non-selectable
    build.newTable = (colEdit = false) => {
        this.addClass("sui-grid sui-grid-core")
        this.append("<div class='sui-gridheader sui-scrolldiv' style='padding-right: 16px;'><div class='sui-headercontent'>"); // Başlık alanı
        if(colEdit) {
            this.html("");
            this.append("<div class='sui-gridheader sui-scrolldiv' style='padding-right: 16px;'><div class='sui-headercontent'>"); // Başlık alanı
            // this.find(".sui-gridheader > .sui-headercontent").append("<table class='sui-table sui-non-selectable'><colgroup>"); // Başlık içindeki tablo
            // this.find(".sui-gridheader > .sui-headercontent > table").append("<thead><tr>")
        } else {
        }
        this.append("<div class='sui-gridcontent sui-scroller'><div class='sui-content'><table class='sui-table sui-hover sui-selectable'>"); // İçerik alanı
        this.find(".sui-gridheader > .sui-headercontent").append("<table class='sui-table sui-non-selectable'><colgroup>"); // Başlık içindeki tablo
        this.find(".sui-gridheader > .sui-headercontent > table").append("<thead><tr>")
        
        this.find(".sui-gridcontent > .sui-content > table").append("<colgroup>") // İçerik içindeki tablo
        for (let i of build.columns) {
            this.find(".sui-gridheader > .sui-headercontent > table > colgroup").append(`<col style="width:${i.width}">`);
            this.find("div.sui-gridcontent.sui-scroller > div > table > colgroup").append(`<col style="width:${i.width}">`);
            this.find(".sui-gridheader > .sui-headercontent > table > thead > tr").append(`<th class='sui-headercell'>${i.title}`);
        }

        $(document).ready(function () {
            // console.log("header:", $("#tablo > div.sui-gridheader.sui-scrolldiv").prop("offsetHeight"))
            if ($("#tablo > div.sui-gridheader.sui-scrolldiv").prop("offsetHeight") > 39) {
                $("#tablo > div.sui-gridcontent").height(439)
                $("#tablo > div.sui-gridcontent > .sui-content").height(439)
            }
            else if ($("#tablo > div.sui-gridheader.sui-scrolldiv").prop("offsetHeight") < 57) {
                $("#tablo > div.sui-gridcontent").height(461) //461
                $("#tablo > div.sui-gridcontent > .sui-content").height(461)
            }
        })
    
        $(window).resize(function () {
            console.log("header:", $("#tablo > div.sui-gridheader.sui-scrolldiv").prop("offsetHeight"))
            // console.log("grid:", $("#tablo > div.sui-gridcontent").prop("offsetHeight"))
            if ($("#tablo > div.sui-gridheader.sui-scrolldiv").prop("offsetHeight") > 39) {
                $("#tablo > div.sui-gridcontent").height(439)
                $("#tablo > div.sui-gridcontent > .sui-content").height(439)
            }
            else if ($("#tablo > div.sui-gridheader.sui-scrolldiv").prop("offsetHeight") < 57) {
                $("#tablo > div.sui-gridcontent").height(461) //461
                $("#tablo > div.sui-gridcontent > .sui-content").height(461)
            }
        })

        this.find(".sui-gridheader > table").append("<thead><tr class='sui-columnheader'>");

        this.find(".sui-gridcontent > .sui-content > table").append("<tbody>");
        
        
        console.log(build.columns)
    }

    build.newTable(false);

    


    // this.find(".sui-gridcontent > .sui-content").append("<table class='sui-table sui-hover sui-selectable'>") // İçerik içindeki tablo
    


    /* 
    ALT BİLGİ ALANI ŞİMDİLİK DEVRE DIŞI!!!
        this.append("<div class='sui-pager sui-pager-core'>") // Alt Bilgi alanı
        this.find(".sui-pager.sui-pager-core").append("<ul class='sui-pagination'>") // Alt bilgi içinde sayfalar
        this.append("<div class='sui-pager sui-pager-core'>")
    */

    // this.html("<table class='sui-table sui-hover sui-selectable'>")
    


    if (build.aggregate.show) {
        this.append($("#tablo > div:nth-child(1)").html())

    }

    build.simple = () => {
        let system = {
            columns: [
                {
                    title: "Hesap Kodu",
                    field: "heskod",
                    width: "150px",
                    type: "text"
                },
                {
                    title: "Tarih",
                    field: "evraktarihi",
                    width: "150px",
                    type: "date",
                    format: {
                        convert: [ "dym", "ymd" ],
                        separate: [ ".", "-" ]
                    }
                },
                {
                    title: "Fatura No",
                    field: "faturano",
                    width: "150px",
                    type: "text"
                },
                {
                    title: "Vergi Numarası",
                    field: "vergino",
                    width: "150px",
                    type: "number"
                },
                {
                    title: "Borç",
                    field: "borc",
                    width: "150px",
                    type: "float"
                },
                {
                    title: "Alacak",
                    field: "alacak",
                    width: "150px",
                    type: "float"
                }
            ],
        }
        return system;
    }

    build.addrow = row => {
        console.log(typeof row)
        // if (typeof row === "object"){
        //     console.log("object")
        // }
        row.shortID = Math.random().toString(16).slice(2)

        build.data.push(row)
        let tr = `<tr class='sui-row' data-shortid=${row.shortID}>`;
        build.columns.forEach((e) => {
            row[ e.field ] = (row[ e.field ] == null) ? "" : row[ e.field ];
            switch (e.type) {
                case "text":
                    tdata = row[ e.field ];
                    // row[e.field]
                    break;
                case "date":
                    let format = e.format
                    let tarih = row[ e.field ];
                    tarih = {
                        y: tarih.split(format.separate[ 0 ])[ 0 ],
                        m: tarih.split(format.separate[ 0 ])[ 1 ],
                        d: tarih.split(format.separate[ 0 ])[ 2 ]
                    }
                    let yenitarih = format.convert[ 1 ].split("").map(e => {
                        return tarih[ e ]
                    })
                    tdata = yenitarih.join(format.separate[ 1 ]);
                    break;
                case "number":
                    tdata = row[ e.field ];
                    break;
                case "float":
                    tdata = row[ e.field ];
                    break;
                default:
                    tdata = row[ e.field ];
            }
            tr += `<td class="sui-cell">${tdata}`
        })
        this.find(".sui-gridcontent > .sui-content > table > tbody").append(tr);
    }

    $(".sui-content").scroll(function () {
        // console.log(e)
        // $(".sui-headercontent").prop("scrollLeft", scrolleft)
        $(".sui-headercontent").each((i, e) => {
            let scrolleft = $(this).prop("scrollLeft")
            $(".sui-headercontent").eq(i).prop("scrollLeft", scrolleft)
            // $(e).prop("scrollLeft", scrolleft)
        })
    })





    $(".sui-content").css("overflow-y", "scroll")

    toTableBody = (rebuildData, isShow) => {
        rebuildData.forEach(row => {
            row.shortID = row.shortID = (row?.shortID) ?? Math.random().toString(16).slice(2)
            let tr = `<tr class='sui-row' data-shortid=${row.shortID}>`;
            build.columns.forEach((e) => {
                let field = `["${e.field.split(">").join('"]["')}"]`;
                // console.log(eval(`row${field}`))
                row[ e.field ] = (eval(`row${field}`) == null) ? "" : eval(`row${field}`);
                let trow = {
                    data: "",
                    class: ""
                };
                switch (e.type) {
                    case "text":
                        trow = {
                            data: row[ e.field ].toString().trim(),
                            class: ""
                        };
                        // row[e.field]
                        break;
                    case "date":
                        let format = e.format
                        
                        let tarih = row[ e.field ];

                        tarih = {
                            d: tarih.split(format.separate[ 0 ])[ 0 ],
                            m: tarih.split(format.separate[ 0 ])[ 1 ],
                            y: tarih.split(format.separate[ 0 ])[ 2 ]
                        }
                        let yenitarih = format.convert[ 1 ].split("").map(date_ => {
                            return tarih[ date_ ]
                        })
                        trow = {
                            data: yenitarih.join(format.separate[ 1 ]),
                            class: ""
                        }
                        break;

                    case "datetime":

                        let formatTime = e.format
                        let tarihTime = row[ e.field ].split("T")[ 0 ];
                        tarihTime = {
                            d: tarihTime.split(formatTime.separate[ 0 ])[ 2 ],
                            m: tarihTime.split(formatTime.separate[ 0 ])[ 1 ],
                            y: tarihTime.split(formatTime.separate[ 0 ])[ 0 ]
                        }
                        let yenitarihTime = formatTime.convert[ 1 ].split("").map(e => {
                            return tarihTime[ e ]
                        })
                        trow = {
                            data: yenitarihTime.join(formatTime.separate[ 1 ]),
                            class: ""
                        }
                        break;
                    case "number":
                        trow = {
                            data: row[ e.field ],
                            class: "toRightNumber"
                        }
                        break;
                    case "txtNumber":
                        trow = {
                            data: parseFloat(row[ e.field ]).toFixed(2),
                            class: "toRightNumber"
                        }
                        break;
                    case "float":
                        trow = {
                            data: row[ e.field ] == "" ? "" : parseFloat(row[ e.field ]).toFixed(2),
                            class: "toRightNumber"
                        }
                        break;
                    case "floatTR":
                        trow = {
                            data: row[ e.field ] == "" ? "" : parseFloat(row[ e.field ]).toFixed(2).split(".").join(","),
                            class: "toRightNumber"
                        }
                        break;
                    default:
                        tdata = row[ e.field ];
                }
                // console.log(tdata)
                tr += `<td class="sui-cell ${trow.class}">${trow.data}`
            })
            // console.log(isShow)
            if (isShow) {
                this.find(".sui-gridcontent > .sui-content > table > tbody").append(tr);
            } else {
                if (row?.show) {
                    console.log(row?.show)
                    this.find(".sui-gridcontent > .sui-content > table > tbody").append(tr);
                }
            }
        })
    }
    toTableBody(build.data, true)
    $("#example-content > div.groups > div > input[type=text]").on("keyup", (findVal) => {
        this.find(".sui-gridcontent > .sui-content > table > tbody").html("")
        function searchForEach(array_, input_) {
            // console.log(join_)
            array_.forEach(value_ => {
                let isNumber = Object.values(value_).map(nmb => {
                    // if(typeof )
                    if (typeof nmb == "number") {
                        nmb = nmb.toFixed(2).split(".").join(",")
                    }
                    return nmb;
                })
                console.log(isNumber)
                value_.show = Object.values(isNumber).join(" ").toLocaleUpperCase()?.includes(input_)
            })
            return array_
        }

        toTableBody(searchForEach(build.data, $(findVal.target).val().toLocaleUpperCase()))
    })
    
    build.newData = (newData) => {
        build.data = newData;
        toTableBody(build.data, true)
    }
    return build
}