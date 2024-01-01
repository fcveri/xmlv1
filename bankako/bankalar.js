function bankalar() {

    this.garanti = function (excelDosyasi) {
        htmlTablo.columns = [
            {
                title: "Satır No",
                field: "Satır No",
                width: "80px",
                type: "number"
            },
            {
                title: "Tarih",
                field: "Tarih",
                width: "80px",
                type: "date",
                format: {
                    convert: [ "dmy", "dmy" ],
                    separate: [ "/", "." ]
                }
            },
            {
                title: "Açıklama",
                field: "Açıklama",
                width: "300px",
                type: "text"
            },
            {
                title: "Etiket",
                field: "Etiket",
                width: "125px",
                type: "text"
            },
            {
                title: "Tutar",
                field: "Tutar",
                width: "100px",
                type: "floatTR"
            },
            {
                title: "Eski Bakiye",
                field: "Bakiye",
                width: "100px",
                type: "floatTR"
            },
            {
                title: "Yeni Bakiye",
                field: "Yeni Bakiye",
                width: "100px",
                type: "floatTR"
            }
        ]
        htmlTablo.newTable(true)
        var reader = new FileReader();
        reader.readAsArrayBuffer(excelDosyasi);

        reader.onload = function () {
            var excel = new Uint8Array(reader.result);
            let wb = XLSX.read(excel, { type: 'array' });
            let ws = wb.Sheets[ wb.SheetNames[ 0 ] ];
            let sheetData = XLSX.utils.sheet_to_json(ws);

            let newData = []
            let yeniBakiye = 0;
            let satirNo = 0;
            for (let index in sheetData) {

                if (index == 0) {
                    yeniBakiye = parseFloat(sheetData[ 0 ][ "Bakiye" ] - sheetData[ 0 ][ "Tutar" ])
                    satirNo += 1;
                    newData.push({
                        "Satır No": satirNo,
                        Tarih: "",
                        "Açıklama": "Devir",
                        Etiket: "",
                        Tutar: "",
                        "Bakiye": parseFloat(yeniBakiye.toFixed(2)),
                        "Dekont No": "",
                        "Yeni Bakiye": parseFloat(yeniBakiye.toFixed(2))
                    })
                }
                let regex = /(?<=K:.*)(\d+)?(,)?(\d+)/g;
                let komisyon = regex.exec(sheetData[ index ][ "Açıklama" ]);

                if (komisyon != null) {
                    komisyon = parseFloat(komisyon[ 0 ].replace(/,/, "."))
                } else {
                    komisyon = 0;
                }

                if (komisyon > 0) {
                    satirNo += 1;
                    yeniBakiye = yeniBakiye + sheetData[ index ][ "Tutar" ] + komisyon
                    newData.push({
                        "Satır No": satirNo,
                        Tarih: sheetData[ index ][ "Tarih" ],
                        "Açıklama": sheetData[ index ][ "Açıklama" ].replace(/( {2,})/g, " "),
                        Etiket: "PosBrüt",
                        Tutar: parseFloat((sheetData[ index ][ "Tutar" ] + komisyon).toFixed(20)),
                        "Bakiye": sheetData[ index ][ "Bakiye" ],
                        "Dekont No": sheetData[ index ][ "Dekont No" ],
                        "Yeni Bakiye": parseFloat(yeniBakiye.toFixed(2))
                    })
                    yeniBakiye -= komisyon
                    satirNo += 1;
                    newData.push({
                        "Satır No": satirNo,
                        Tarih: sheetData[ index ][ "Tarih" ],
                        "Açıklama": sheetData[ index ][ "Açıklama" ].replace(/( {2,})/g, " "),
                        Etiket: "PosKomisyon",
                        Tutar: parseFloat((- komisyon).toFixed(2)),
                        "Bakiye": sheetData[ index ][ "Bakiye" ],
                        "Dekont No": sheetData[ index ][ "Dekont No" ],
                        "Yeni Bakiye": parseFloat(yeniBakiye.toFixed(2))
                    })
                } else {
                    satirNo += 1;
                    sheetData[ index ][ "Satır No" ] = satirNo;
                    sheetData[ index ][ "Açıklama" ] = sheetData[ index ][ "Açıklama" ].replace(/( {2,})/g, " ")
                    yeniBakiye += sheetData[ index ][ "Tutar" ];
                    sheetData[ index ][ "Yeni Bakiye" ] = parseFloat(yeniBakiye.toFixed(2))
                    newData.push(sheetData[ index ])
                }

                //if (index == 10) {
                //    break;
                //}
            }
            htmlTablo.newData(newData)
        }
    }
    this.ziraat = function (excelDosyasi) {
        htmlTablo.columns = [
            {
                title: "Satır No",
                field: "Satır No",
                width: "80px",
                type: "number"
            },
            {
                title: "Tarih",
                field: "Tarih",
                width: "80px",
                type: "date",
                format: {
                    convert: [ "dmy", "dmy" ],
                    separate: [ ".", "." ]
                }
            },
            {
                title: "Fiş No",
                field: "Fiş No",
                width: "100px",
                type: "text"
            },
            {
                title: "Açıklama",
                field: "Açıklama",
                width: "300px",
                type: "text"
            },
            {
                title: "Etiket",
                field: "Etiket",
                width: "100px",
                type: "text"
            },
            {
                title: "Tutar",
                field: "Tutar",
                width: "100px",
                type: "floatTR"
            },
            {
                title: "Eski Bakiye",
                field: "Bakiye",
                width: "100px",
                type: "floatTR"
            },
            {
                title: "Yeni Bakiye",
                field: "Yeni Bakiye",
                width: "100px",
                type: "floatTR"
            }
        ]
        htmlTablo.newTable(true)

        var reader = new FileReader();
        reader.readAsArrayBuffer(excelDosyasi);

        reader.onload = function () {
            var excel = new Uint8Array(reader.result);
            let wb = XLSX.read(excel, { type: 'array' });
            let ws = wb.Sheets[ wb.SheetNames[ 0 ] ];
            let sheetData = XLSX.utils.sheet_to_json(ws);

            console.log(sheetData)


            let newData = []
            let yeniBakiye = 0;
            let satirNo = 0;
            for (let index in sheetData) {

                if (index == 0) {
                    yeniBakiye = parseFloat(sheetData[ 0 ][ "Bakiye" ] - sheetData[ 0 ][ "İşlem Tutarı" ])
                    satirNo += 1;
                    newData.push({
                        "Satır No": satirNo,
                        Tarih: "",
                        "Açıklama": "Devir",
                        Etiket: "",
                        Tutar: "",
                        "Bakiye": parseFloat(yeniBakiye.toFixed(2)),
                        "Yeni Bakiye": parseFloat(yeniBakiye.toFixed(2))
                    })
                }
                let regex = /(?<=Komisyon.:.)(\d+)?(,)?(\d+)/g;
                let komisyon = regex.exec(sheetData[ index ][ "Açıklama" ]);

                if (komisyon != null) {
                    komisyon = parseFloat(komisyon[ 0 ].replace(/,/, "."))
                } else {
                    komisyon = 0;
                }

                if (komisyon > 0) {
                    satirNo += 1;
                    yeniBakiye = yeniBakiye + sheetData[ index ][ "İşlem Tutarı" ] + komisyon
                    newData.push({
                        "Satır No": satirNo,
                        "Fiş No": sheetData[index]["Fiş No"],
                        Tarih: sheetData[ index ][ "Tarih" ],
                        "Açıklama": sheetData[ index ][ "Açıklama" ].replace(/( {2,})/g, " "),
                        Etiket: "PosBrüt",
                        Tutar: parseFloat((sheetData[ index ][ "İşlem Tutarı" ] + komisyon).toFixed(20)),
                        "Bakiye": sheetData[ index ][ "Bakiye" ],
                        "Yeni Bakiye": parseFloat(yeniBakiye.toFixed(2))
                    })
                    yeniBakiye -= komisyon
                    satirNo += 1;
                    newData.push({
                        "Satır No": satirNo,
                        "Fiş No": sheetData[index]["Fiş No"],
                        Tarih: sheetData[ index ][ "Tarih" ],
                        "Açıklama": sheetData[ index ][ "Açıklama" ].replace(/( {2,})/g, " "),
                        Etiket: "PosKomisyon",
                        Tutar: parseFloat((- komisyon).toFixed(2)),
                        "Bakiye": sheetData[ index ][ "Bakiye" ],
                        "Yeni Bakiye": parseFloat(yeniBakiye.toFixed(2))
                    })
                } else {
                    satirNo += 1;
                    sheetData[ index ][ "Satır No" ] = satirNo;
                    sheetData[ index ][ "Açıklama" ] = sheetData[ index ][ "Açıklama" ].replace(/( {2,})/g, " ")
                    sheetData[index]["Tutar"] = sheetData[ index ][ "İşlem Tutarı" ]
                    yeniBakiye += sheetData[ index ][ "İşlem Tutarı" ];
                    delete sheetData[ index ][ "İşlem Tutarı" ]
                    sheetData[ index ][ "Yeni Bakiye" ] = parseFloat(yeniBakiye.toFixed(2))
                    newData.push(sheetData[index])
                }

                //if (index == 10) {
                //    break;
                //}
            }
            htmlTablo.newData(newData)
        }
    }
    return this;
}