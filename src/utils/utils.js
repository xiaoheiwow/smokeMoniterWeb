import FileSaver from "file-saver";
import * as XLSX from "xlsx";
export function exportExcel() {
  //转换成excel时，使用原始的格式
  var xlsxParam = { raw: true }; 
  let tableDom = document.querySelector("#table").cloneNode(true);
  let tableHeader = tableDom.querySelector(".el-table__header-wrapper");
  let tableBody = tableDom.querySelector(".el-table__body");
  tableHeader.childNodes[0].append(tableBody.childNodes[1]);
  let headerDom = tableHeader.childNodes[0].querySelectorAll("th");
  // 移除左侧checkbox的节点
  if (headerDom[0].querySelectorAll(".el-checkbox").length > 0) {
    headerDom[0].remove();
  }
  for (let key in headerDom) {
    if (headerDom[key].innerText === "操作") {
      headerDom[key].remove();
    }
  }
  // 清理掉checkbox 和操作的button
  let tableList = tableHeader.childNodes[0].childNodes[2].querySelectorAll(
    "td"
  );
  for (let key = 0; key < tableList.length; key++) {
    if (
      tableList[key].querySelectorAll(".el-checkbox").length > 0 ||
      tableList[key].querySelectorAll(".el-button").length > 0
    ) {
      tableList[key].remove();
    }
  }

  var wb = XLSX.utils.table_to_book(tableHeader, xlsxParam);
  var wbout = XLSX.write(wb, {
    bookType: "xlsx",
    bookSST: true,
    type: "array"
  });
  try {
    FileSaver.saveAs(
      new Blob([wbout], { type: "application/octet-stream;charset=utf-8" }),
      "sheetjs.xlsx"
    );
  } catch (e) {
    if (typeof console !== "undefined") console.log(e, wbout);
  }
  return wbout;
}
