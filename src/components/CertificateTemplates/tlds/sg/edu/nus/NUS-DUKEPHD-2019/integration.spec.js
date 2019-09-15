import { Selector } from "testcafe";

fixture("National University of Singapore").page`http://localhost:3000`;

const Certificate = "./sample.opencert";

const TemplateTabList = Selector("#template-tabs-list");
const RenderedCertificate = Selector("#rendered-certificate");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("NUS-DUKEPHD-2019 degree scroll is rendered correctly", async t => {
  // Uploads certificate via dropzone
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  // Certificate tabs rendered
  await t.expect(TemplateTabList.textContent).contains("Certificate");
  await t.expect(TemplateTabList.textContent).contains("Transcript");

  // Certificate/Transcript tab content
  await validateTextContent(t, RenderedCertificate, [
    "NATIONAL",
    "UNIVERSITY",
    "OF SINGAPORE",
    "A0090502U, NAME",
    "Doctor",
    "Philosophy",
    "31 July 2018"
  ]);
  const transcriptTab = TemplateTabList.find(":nth-child(2)");
  await t.click(transcriptTab);
  await validateTextContent(t, RenderedCertificate, [
    "A0090502U, name",
    "A0090502U",
    "01/01/1905",
    "11/09/2019",
    "DOCTOR OF PHILOSOPHY",
    "COMPLETED PROGRAMME",
    "2013/2014",
    "GMS6900",
    "Student Research Seminars",
    "GMS6901",
    "Molecules to Medicines",
    "GMS6902",
    "Laboratory Rotation 1",
    "GMS6903",
    "Laboratory Rotation 2",
    "GMS6904",
    "Principles of Infectious Diseases",
    "2014/2015",
    "GMS6900",
    "Student Research Seminars",
    "GMS6910",
    "Evolutionary Genetics",
    "2015/2016",
    "GMS6900",
    "Student Research Seminars",
    "2016/2017 SEMESTER 1",
    "GMS6900",
    "Student Research Seminars",
    "2017/2018 SEMESTER 2",
    "GMS6991",
    "Thesis"
  ]);
});