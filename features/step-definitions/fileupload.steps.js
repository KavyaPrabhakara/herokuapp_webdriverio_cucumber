const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect } = require('@wdio/globals');
const FileUploadPage = require('../pageobjects/fileupload.page.js');

const FILE_NAME = 'test-data.txt';

Given('user is on file upload page', async () => {
  await FileUploadPage.open();
});

When('user uploads a valid file', async () => {
  await FileUploadPage.uploadFile(FILE_NAME);
});

Then('uploaded file name should be displayed', async () => {
  const uploadedFile = await FileUploadPage.getUploadedFileName();
  expect(uploadedFile).toBe(FILE_NAME);
});
