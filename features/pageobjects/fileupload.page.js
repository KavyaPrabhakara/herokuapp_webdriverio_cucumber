const path = require('path');
const Page = require('./page');
const waitUtils = require('../../utils/waitUtils');

class FileUploadPage extends Page {
  get fileInput() { return $('#file-upload'); }
  get uploadBtn() { return $('#file-submit'); }
  get uploadedFile() { return $('#uploaded-files'); }

  async open() {
    await super.open('/upload');
  }

  async uploadFile(fileName) {
    const filePath = path.join(process.cwd(), 'fileUpload', fileName);
    const remoteFilePath = await browser.uploadFile(filePath);

    // await this.fileInput.waitForExist({ timeout: 5000 });
    await waitUtils.waitForExist(this.fileInput);
    await this.fileInput.setValue(remoteFilePath);
    await this.uploadBtn.click();
  }

  async getUploadedFileName() {
    await waitUtils.waitForDisplayed(this.uploadedFile);
    return await this.uploadedFile.getText();
  }
}

module.exports = new FileUploadPage();
