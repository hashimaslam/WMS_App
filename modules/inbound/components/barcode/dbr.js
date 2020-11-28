import DBR from "dynamsoft-javascript-barcode";
DBR.BarcodeReader.engineResourcePath =
  "https://cdn.jsdelivr.net/npm/dynamsoft-javascript-barcode@8.0.0/dist/";
// Please visit https://www.dynamsoft.com/customer/license/trialLicense to get a trial license
DBR.BarcodeReader.productKeys =
  "t0076xQAAALbFiaw2lonsPmsvBOMeX9dhZdPiPJYs4SG6kcwJLnP4L8GDFMM2dXC0aQmUdHLkfLnyP1LqB3ynVw8f3/8IPTNqYQIArYorSw==";
// DBR.BarcodeReader._bUseFullFeature = true; // Control of loading min wasm or full wasm.
export default DBR;
