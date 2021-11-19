var dropdownList = document.getElementsByClassName("btn-dropdown");

var i;

for (i = 0; i < dropdownList.length; i++) {
  dropdownList[i].addEventListener("click", function () {
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "none") {
      dropdownContent.style.display = "block";
      this.getElementsByTagName("i")[1].classList.replace(
        "fa-angle-right",
        "fa-angle-down"
      );
    } else {
      dropdownContent.style.display = "none";
      this.getElementsByTagName("i")[1].classList.replace(
        "fa-angle-down",
        "fa-angle-right"
      );
    }
  });
}

//function click to open or close
function clickOpenOrClose(btnCtrl, dropdownArea) {
  var btn = document.getElementsByClassName(btnCtrl);
  btn[0].addEventListener("click", function () {
    var dropList = document.getElementsByClassName(dropdownArea);
    if (dropList[0].style.display == "none") {
      dropList[0].style.display = "block";
    } else {
      dropList[0].style.display = "none";
    }
  });
}
//goi ham de mo hoac dong nut co class btn-option va div can mo co class la option-list
// clickOpenOrClose("btn-option", "option-list");

// Mo sidebar khi click vao Menu Icon
var i = 1;
document
  .getElementsByClassName("btn-bars")[0]
  .addEventListener("click", function () {
    let root = document.documentElement;
    if (i == 1) {
      root.style.setProperty("--sidebar-width", "0px");
      i = 0;
    } else {
      root.style.setProperty("--sidebar-width", "200px");
      i = 1;
    }
  });


//select all checkbox when click on the first checkbox
function CheckAll() {
  var chkCtrl = document.getElementsByClassName("check-ctrl");
  //console.log(chkCtrl[0].checked==true);  [0] de lay phan tu mang
  var i;
  var checkList = document.getElementsByName("chk");
  if (chkCtrl[0].checked == true)
    for (i = 0; i < checkList.length; i++) {
      checkList[i].checked = true;
    }
  else
    for (i = 0; i < checkList.length; i++) {
      checkList[i].checked = false;
    }
}

//filter button

var filBtn = document.getElementsByClassName("opt-filter");
for (var i = 0; i < filBtn.length; i++) {
  filBtn[i].addEventListener("click", function () {
    var optList = this.nextElementSibling;
    if (optList.style.display === "none") {
      optList.style.display = "block";
    } else {
      optList.style.display = "none";
    }
  });
}


//JQUERY
$(document).ready(function () {

  //Xóa sản phẩm
  $(document).on("click", "button.btn-delete", function () {
    if (confirm("Bạn thực sự muốn xóa sản phẩm này?")) {
      $(this).closest("tr").remove();
      refreshForm();
    }
    return false;
  });

  function refreshForm(params) {
    $("#msp").val(""); //gan gia tri các input bằng là rỗng sau khi thêm table rơ xong
    $("#tsp").val("");
    $("#gsp").val("");
    blnThem = null;
    $("#frm-taosp").hide();
    $("#msp").prop("disabled", false);
  }

  function themSanPham() {  //ham thuc hien sau khi nhan button Them
    $("#add-row").click(function () {
      if (blnThem == 1) {
        var ma = $("#msp").val();
        var ten = $("#tsp").val();
        var gia = $("#gsp").val();
        if (ma != "" && ten != "" && gia != "") {
          $(".table-sanpham tbody tr")
            .last()
            .after(
              "<tr>" +
              '<th><input name="chk" type="checkbox" /></th>' +
              '<td class="ma-san-pham">' +
              ma +
              "</td>" +
              "<td>" +
              ten +
              "</td>" +
              "<td>" +
              gia +
              "</td>" +
              '<td class="status-bill-order">Còn hàng</td>' +
              "<td>" +
              '<button class="btn-act btn-edit"><i class="fas fa-pen"></i></button>' +
              '<button type="button" class="btn-act btn-delete"><i class="fas fa-trash-alt"></i></button>' +
              "</td>" +
              "</tr>"
            );
          refreshForm();
        } else {
          confirm("Hãy nhập đầy đủ thông tin sản phẩm !");
        }
      }
    });
  }
  function suaSanPham() {
    $("#msp").val($(tblCell[0]).text());
    $("#msp").prop("disabled", true);
    $("#tsp").val($(tblCell[1]).text());
    $("#gsp").val($(tblCell[2]).text());
    $("#add-row").click(function () {
      if (blnThem == 2) {
        var tenmoi = $("#tsp").val();
        var giamoi = $("#gsp").val();
        $(tblCell[1]).text(tenmoi);
        $(tblCell[2]).text(giamoi);
        refreshForm();
      }
    });
  }
  var blnThem;
  var tblCell;
  function TaoorChinhSua() {
    if (blnThem == 1) {
      $("#frm-taosp").toggle();
      themSanPham();
    }
    if (blnThem == 2) {
      $("#frm-taosp").show();
      suaSanPham();
    }
  }
  $(".create-product").click(function () {
    blnThem = 1;
    TaoorChinhSua();
  });

  $(document).on("click", "button.btn-edit", function () {
    blnThem = 2;
    tblCell = $(this).parents("tr").children("td"); //tim vi tri cua table row can chinh sua
    TaoorChinhSua();
  });
});
