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

test("NUS-K15HUJIJDP-2019 degree scroll is rendered correctly", async t => {
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
    "A0109716A, NAME",
    "Doctor",
    "Philosophy",
    "28 February 2018"
  ]);
  const transcriptTab = TemplateTabList.find(":nth-child(2)");
  await t.click(transcriptTab);
  await validateTextContent(t, RenderedCertificate, [
    "A0109716A, name",
    "A0109716A",
    "01/01/1905",
    "26/09/2019",
    "DOCTOR OF PHILOSOPHY",
    "COMPLETED PROGRAMME",
    "2013/2014 SEMESTER 1",
    "ES5001A",
    "GRADUATE ENGLISH COURSE (INTERMEDIATE LEVEL)",
    "PR5115",
    "DRUG INFORMATION, CRITICAL LITERATURE EVALUATION AND BIOSTATISTICS",
    "PR5211",
    "PHARMACEUTICAL ANALYSIS IV",
    "2013/2014 SEMESTER 2",
    "PR5198",
    "GRADUATE SEMINAR MODULE IN PHARMACY",
    "PR5216",
    "ADVANCES IN DRUG DELIVERY",
    "2014/2015 SEMESTER 1",
    "2014/2015 SEMESTER 2",
    "2015/2016 SEMESTER 1",
    "PR5213",
    "PHARMACEUTICAL PROCESS VALIDATION",
    "2015/2016 SEMESTER 2",
    "PR5220",
    "BIOPROCESS TECHNOLOGY",
    "2016/2017 SEMESTER 1",
    "ES5002",
    "Graduate English Course (Advanced Level)"
  ]);
});
