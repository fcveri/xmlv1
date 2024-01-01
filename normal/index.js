// DataTable ayarları

$('#bilanco').DataTable({
//    autoFill: true,
    scrollX: true,
    pageLength: 10, // Kaç satır listelenecek?
    lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "Tümü"]], // Satır listeleme seçeneğini düzenleme
    order: [[1, "asc"], [2, "asc"]],
    // Tarih: asc = eskiden yeniye ** desc = "yeniden eskiye"
    // Harf ve Sayılar için = asc = büyükten küçüğe
    columnDefs: [
        // {width: "400px", targets: 3},
        { width: "300px", targets: 4 },
        { width: "300px", targets: 6 },
        { width: "80px", targets: 8 },
        { width: "80px", targets: 9 },
        { width: "80px", targets: 11 },
        { width: "80px", targets: 13 },
        { width: "80px", targets: 14 },
        { width: "80px", targets: 15 },
        { width: "80px", targets: 16 },
        { width: "300px", targets: 20 },
        { className: "textright", targets: [8, 9, 10, 11, 12,13,14,15, 16, 17, 18, 23] }, { targets: ['nosort'], orderable: false }], // Class = "nosort" olan sütunların sıralama özelliği kapatılır
    // scrollY:"200px",
    // scrollCollapse: true,
    // paging:true,
    // dom: 'Bl<"left"f>pti',
    // l - length changing input control
    // f - filtering input
    // t - The table!
    // i - Table information summary
    // p - pagination control
    // r - processing display element
    // B=Buttons

    dom:'Bf<"top"p>rt<"bottom"i>',
    buttons:
        [
            { extend: 'colvis', text: '<img src="https://img.icons8.com/dusk/44/000000/edit-column.png"><img src="https://img.icons8.com/dusk/44/000000/add-column.png"><img src="https://img.icons8.com/dusk/44/000000/delete-column.png"><br>Göster/Gizle', columnText: function (dt, idx, title) { return (idx + 1) + ': ' + title; } },
            {text: '<button"><img src="https://img.icons8.com/dusk/44/000000/xml-file.png"><br>Dosyaları Aç</button>',action: function ( e, dt, node, config ) {
        $('#i_file').click();
    }},
            { extend: 'copy', title: '', text: '<img src="https://img.icons8.com/dusk/44/000000/copy.png"><br>Kopyala',exportOptions: {
                //modifier: {page: 'current'}
            } },
            { extend: 'print', title: '', text: '<img src="https://img.icons8.com/dusk/44/000000/print.png"><br>Yazdır',
            action: function ( e, dt, node, config ) {
        alert("Yatay yazdırma ayarı yapılamadı Pdf formatında indirip yazdırabiliirsiniz!");
    }},
            { extend: 'pdfHtml5', orientation: 'landscape', pageSize: 'LEGAL', text: '<img src="https://img.icons8.com/dusk/44/000000/pdf.png"><br>PDF' },
            {
                filename: 'Bilanço', text: '<img src="https://img.icons8.com/dusk/44/000000/ms-excel.png"><br>Excel', extend: 'excelHtml5',
                
                title:'',
                exportOptions: 
                {
                    //modifier: {page: 'current'},
                    
                    format: {
                        body: function (data, row, column, node) {
                            //return column === 14 ? "\0" + data : data;
                            switch (column) {
                                case 1: return moment(data, 'YYYY-MM-DD').format('DD.MM.YYYY'); break;
                                case 2: return "\0" + data;
                                case 7: return data.replace(/[.]/g, '').replace(/,/, '.');
                                case 8: return data.replace(/[.]/g, '').replace(/,/, '.');
                                case 9: return data.replace(/[.]/g, '').replace(/,/, '.');
                                case 10: return data.replace(/[.]/g, '').replace(/,/, '.');
                                case 11: return data.replace(/[.]/g, '').replace(/,/, '.');
                                case 12: return data.replace(/[.]/g, '').replace(/,/, '.');
                                case 13: return data.replace(/[.]/g, '').replace(/,/, '.');
                                case 14: return data.replace(/[.]/g, '').replace(/,/, '.');
                                case 15: return data.replace(/[.]/g, '').replace(/,/, '.');
                                case 16: return data.replace(/[.]/g, '').replace(/,/, '.');
                                case 17: return data.replace(/[.]/g, '').replace(/,/, '.');
                                case 18: return data.replace(/[.]/g, '').replace(/,/, '.');
                                // case 14:return data.replace(/[,]/g, '.');
                                case 20: return "\0" + data;
                                case 23: return data.replace(/[.]/g, '').replace(/,/, '.');

                                //case 14:return string.format(data.text)
                                break
                                default: return data; break;
                                
                            } 
                        }
                    }
                }
            }
        ],
    language: { url: "Turkish.json" },
});

$('#i_file').change(function (event) {
    // alert(event.target.files.length);
    // console.log(event.target.files[0].name)
    for (x = 0; x < event.target.files.length; x++) {
    $fileName = event.target.files[x].name;
    console.log($fileName);
        var tmppath = URL.createObjectURL(event.target.files[x]);
        $.ajax({ type: "GET", url: tmppath, dataType: "xml", success: function_Parsxml });
        function function_Parsxml(xml) {
            var evrakno = "/Invoice/cbc:ID"; evrakno = evrakno.replace(/[/]/g, ">").replace(/[:]/g, "\\:");
            var uuID = "/Invoice/cbc:UUID"; uuID = uuID.replace(/[/]/g, ">").replace(/[:]/g, "\\:");
            var profileID = "/Invoice/cbc:ProfileID"; profileID = profileID.replace(/[/]/g, ">").replace(/[:]/g, "\\:");
            var tarih = "/Invoice/cbc:IssueDate"; tarih = tarih.replace(/[/]/g, ">").replace(/[:]/g, "\\:");
            // var saticino = "/Invoice/cac:AccountingSupplierParty/cac:Party/cac:PartyIdentification/cbc:ID"; saticino = saticino.replace(/[/]/g, ">").replace(/[:]/g, "\\:");
            var saticino = "/Invoice/cac:AccountingSupplierParty/cac:Party/cac:PartyIdentification/cbc:ID[schemeID='TCKN']"; saticino = saticino.replace(/[/]/g, ">").replace(/[:]/g, "\\:");
            var satici1 = "/Invoice/cac:AccountingSupplierParty/cac:Party/cac:PartyName/cbc:Name"; satici1 = satici1.replace(/[/]/g, ">").replace(/[:]/g, "\\:");
            var satici2 = "/Invoice/cac:AccountingSupplierParty/cac:Party/cac:Person/cbc:FirstName"; satici2 = satici2.replace(/[/]/g, ">").replace(/[:]/g, "\\:");
            var satici3 = "/Invoice/cac:AccountingSupplierParty/cac:Party/cac:Person/cbc:FamilyName"; satici3 = satici3.replace(/[/]/g, ">").replace(/[:]/g, "\\:");
            // var alicino = "/Invoice/cac:AccountingCustomerParty/cac:Party/cac:PartyIdentification/cbc:ID"; alicino = alicino.replace(/[/]/g, ">").replace(/[:]/g, "\\:");
            var alicino = "/Invoice/cac:AccountingCustomerParty/cac:Party/cac:PartyIdentification/cbc:ID[schemeID='TCKN']"; alicino = alicino.replace(/[/]/g, ">").replace(/[:]/g, "\\:");
            var alici1 = "/Invoice/cac:AccountingCustomerParty/cac:Party/cac:PartyName/cbc:Name"; alici1 = alici1.replace(/[/]/g, ">").replace(/[:]/g, "\\:");
            var alici2 = "/Invoice/cac:AccountingCustomerParty/cac:Party/cac:Person/cbc:FirstName"; alici2 = alici2.replace(/[/]/g, ">").replace(/[:]/g, "\\:");
            var alici3 = "/Invoice/cac:AccountingCustomerParty/cac:Party/cac:Person/cbc:FamilyName"; alici3 = alici3.replace(/[/]/g, ">").replace(/[:]/g, "\\:");
            
            var unvan;
            if ($(xml).find(saticino).text() === "") {
                saticino = "/Invoice/cac:AccountingSupplierParty/cac:Party/cac:PartyIdentification/cbc:ID[schemeID='VKN']"; saticino = saticino.replace(/[/]/g, ">").replace(/[:]/g, "\\:");
            }
            if ($(xml).find(alicino).text() === "") {
                alicino  = "/Invoice/cac:AccountingCustomerParty/cac:Party/cac:PartyIdentification/cbc:ID[schemeID='VKN']"; alicino = alicino.replace(/[/]/g, ">").replace(/[:]/g, "\\:");
            }
            
            if ($(xml).find(alici1).text() === "") {
                unvan = $(xml).find(alici2).text() + " " + $(xml).find(alici3).text();
            } else {
                unvan = $(xml).find(alici1).text();
                // alert(unvan);
            }
            var saticiUnvan;
            if ($(xml).find(satici1).text() === "") {
                saticiUnvan = $(xml).find(satici2).text() + " " + $(xml).find(satici3).text();
            } else {
                saticiUnvan = $(xml).find(satici1).text();
                // alert(unvan);
            }
            
            var kod = "/Invoice/cbc:InvoiceTypeCode"; kod = kod.replace(/[/]/g, ">").replace(/[:]/g, "\\:");
            var vergisiz = "/Invoice/cac:TaxTotal/cac:TaxSubtotal/cbc:TaxableAmount"; vergisiz = vergisiz.replace(/[/]/g, ">").replace(/[:]/g, "\\:");
            var kdvorani = "/Invoice/cac:TaxTotal/cac:TaxSubtotal/cbc:Percent"; kdvorani = kdvorani.replace(/[/]/g, ">").replace(/[:]/g, "\\:");
            var vergi = "/Invoice/cac:TaxTotal/cac:TaxSubtotal/cbc:TaxAmount"; vergi = vergi.replace(/[/]/g, ">").replace(/[:]/g, "\\:");
            var note = "/Invoice/cbc:Note"; note = note.replace(/[/]/g, ">").replace(/[:]/g, "\\:");
            var fatToplam = "/Invoice/cac:LegalMonetaryTotal/cbc:PayableAmount"; fatToplam = fatToplam.replace(/[/]/g, ">").replace(/[:]/g, "\\:");
            const formatter0 = new Intl.NumberFormat('tr-TR', { currency: 'TRY', minimumFractionDigits: 0 }); // style: 'currency',
            const formatter2 = new Intl.NumberFormat('tr-TR', { currency: 'TRY', minimumFractionDigits: 2 }); // style: 'currency',
            // alert($(xml).find(kdvorani).length);
            var vergisiz00 = 0;
            var vergisiz01 = 0;
            var vergi01 = 0;
            var vergisiz08 = 0;
            var vergi08 = 0;
            var vergisiz18 = 0;
            var vergi18 = 0;
            var vergisiz10 = 0;
            var vergi10 = 0;
            var vergisiz20 = 0;
            var vergi20 = 0;

            // var carikod  = new String("Test.320," + );
            var carikod = "320." + $(xml).find(saticino).eq(0).text();
var dovizKuru;
            var faturaToplamiDoviz;
            var SourceCurrencyCode = "/Invoice/cac:PricingExchangeRate/cbc:SourceCurrencyCode"; SourceCurrencyCode = SourceCurrencyCode.replace(/[/]/g, ">").replace(/[:]/g, "\\:");

            var CalculationRate = "/Invoice/cac:PricingExchangeRate/cbc:CalculationRate"; CalculationRate = CalculationRate.replace(/[/]/g, ">").replace(/[:]/g, "\\:");

            if ($(xml).find(SourceCurrencyCode).text() === ""){
                // console.log("bulunamadı")
                dovizKuru = 1;
                faturaToplamiDoviz = "";
            }else{
                // console.log($(xml).find(SourceCurrencyCode).text())
                dovizKuru = $(xml).find(CalculationRate).text();
                faturaToplamiDoviz = $(xml).find(fatToplam).eq(0).text()
            }

            for (i = 0; i < $(xml).find(kdvorani).length; i++) {
                // alert(formatter0.format($(xml).find(kdvorani).eq(i).text()));
                if (formatter0.format($(xml).find(kdvorani).eq(i).text()) === "0") { 
                    vergisiz00 = $(xml).find(vergisiz).eq(i).text() * dovizKuru; }
                if (formatter0.format($(xml).find(kdvorani).eq(i).text()) === "1") { vergi01 = $(xml).find(vergi).eq(i).text() * dovizKuru; vergisiz01 = $(xml).find(vergisiz).eq(i).text() * dovizKuru; }
                if (formatter0.format($(xml).find(kdvorani).eq(i).text()) === "8") { vergi08 = $(xml).find(vergi).eq(i).text() * dovizKuru; vergisiz08 = $(xml).find(vergisiz).eq(i).text() * dovizKuru; }
                if (formatter0.format($(xml).find(kdvorani).eq(i).text()) === "18") { vergi18 = $(xml).find(vergi).eq(i).text() * dovizKuru; vergisiz18 = $(xml).find(vergisiz).eq(i).text() * dovizKuru; }
                if (formatter0.format($(xml).find(kdvorani).eq(i).text()) === "10") { vergi10 = $(xml).find(vergi).eq(i).text() * dovizKuru; vergisiz10 = $(xml).find(vergisiz).eq(i).text() * dovizKuru; }
                if (formatter0.format($(xml).find(kdvorani).eq(i).text()) === "20") { vergi20 = $(xml).find(vergi).eq(i).text() * dovizKuru; vergisiz20 = $(xml).find(vergisiz).eq(i).text() * dovizKuru; }
            }
            
            $('#bilanco').DataTable().row.add([
                $(xml).find(kod).text(),
                $(xml).find(tarih).text(),
                $(xml).find(evrakno).text(),
                $(xml).find(saticino).eq(0).text(),
                saticiUnvan,
                $(xml).find(alicino).eq(0).text(),
                unvan,
                formatter2.format(vergisiz00.toFixed(2)),
                formatter2.format(vergisiz01.toFixed(2)),
                formatter2.format(vergi01.toFixed(2)),
                formatter2.format(vergisiz08.toFixed(2)),
                formatter2.format(vergi08.toFixed(2)),
                formatter2.format(vergisiz10.toFixed(2)),
                formatter2.format(vergi10.toFixed(2)),
                formatter2.format(vergisiz18.toFixed(2)),
                formatter2.format(vergi18.toFixed(2)),
                formatter2.format(vergisiz20.toFixed(2)),
                formatter2.format(vergi20.toFixed(2)),
                formatter2.format(($(xml).find(fatToplam).eq(0).text() * dovizKuru).toFixed(2)),
                carikod,
                $(xml).find(profileID).text(),
                $(xml).find(uuID).text(),
                $(xml).find(SourceCurrencyCode).text(),
                formatter2.format(faturaToplamiDoviz),
                $(xml).find(note).text(),
                $fileName
            ]).draw(true);
            for (i = 0; i < $(xml).find(vergisiz).length; i++) {
                $('#isletme').DataTable().row.add([
                    "ML",
                    "10186",
                    $(xml).find(tarih).text(),
                    $(xml).find(evrakno).text(),
                    $(xml).find(saticino).eq(0).text(),
                    saticiUnvan,
                    $(xml).find(alicino).eq(0).text(),
                    unvan,
                    formatter2.format($(xml).find(vergisiz).eq(i).text()),
                    formatter0.format($(xml).find(kdvorani).eq(i).text()),
                    formatter2.format($(xml).find(vergi).eq(i).text()),
                    $(xml).find(note).text(),
            ]).draw(true);
            }
        }
       
    }
})

// DataTable ayarları
$('#isletme').DataTable({
//    autoFill: true,
    scrollX: true,
    pageLength: 10, // Kaç satır listelenecek?
    lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "Tümü"]], // Satır listeleme seçeneğini düzenleme
    order: [[2, "asc"], [3, "asc"]],
    // Tarih: asc = eskiden yeniye ** desc = "yeniden eskiye"
    // Harf ve Sayılar için = asc = büyükten küçüğe
    columnDefs: [
        { width: "300px", targets: 5 },
        { width: "300px", targets: 7 },
        { className: "textright", targets: [8,9,10] }, { targets: ['nosort'], orderable: false }], // Class = "nosort" olan sütunların sıralama özelliği kapatılır
    // scrollY:"200px",
    // scrollCollapse: true,
    // paging:true,
    dom: 'Bf<"top"p>rt<"bottom"i>',
    buttons:
        [
            { extend: 'colvis', text: '<img src="https://img.icons8.com/dusk/44/000000/edit-column.png"><img src="https://img.icons8.com/dusk/44/000000/add-column.png"><img src="https://img.icons8.com/dusk/44/000000/delete-column.png"><br>Göster/Gizle', columnText: function (dt, idx, title) { return (idx + 1) + ': ' + title; } },
            {text: '<button"><img src="https://img.icons8.com/dusk/44/000000/xml-file.png"><br>Dosyaları Aç</button>',action: function ( e, dt, node, config ) {
        $('#i_file').click();
    }},
            { extend: 'copy', title: '', text: '<img src="https://img.icons8.com/dusk/44/000000/copy.png"><br>Kopyala',exportOptions: {
                //modifier: {page: 'current'}
            } },
            { extend: 'print', title: '', text: '<img src="https://img.icons8.com/dusk/44/000000/print.png"><br>Yazdır',
            action: function ( e, dt, node, config ) {
        alert("Yatay yazdırma ayarı yapılamadı Pdf formatında indirip yazdırabiliirsiniz!");
    }},
            { extend: 'pdfHtml5', orientation: 'landscape', pageSize: 'LEGAL', text: '<img src="https://img.icons8.com/dusk/44/000000/pdf.png"><br>PDF' },
            {
                filename: 'İşletme', text: '<img src="https://img.icons8.com/dusk/44/000000/ms-excel.png"><br>Excel', extend: 'excelHtml5',
                title:'',
                exportOptions: 
                {
                    //modifier: {page: 'current'},
                    format: {
                        body: function (data, row, column, node) {
                            switch (column) {
                                case 2: return moment(data, 'YYYY-MM-DD').format('DD.MM.YYYY'); break;
                                case 8: return data.replace(/[.]/g, '').replace(/,/, '.');
                                case 9: return data.replace(/[.]/g, '').replace(/,/, '.');
                                case 10: return data.replace(/[.]/g, '').replace(/,/, '.');
                                // case 9: return data.replace(/[.]/g, '').replace(/,/, '.');
                                // case 10: return data.replace(/[.]/g, '').replace(/,/, '.');
                                // case 11: return data.replace(/[.]/g, '').replace(/,/, '.');
                                // case 12:return data.replace(/[.]/g, '').replace(/,/, '.');break
                                default: return data; break
                            }
                        }
                    }
                }
            }
        ],
    language: { url: "Turkish.json" },
});