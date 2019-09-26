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

test("NUS-K18KCLJDP-2019 degree scroll is rendered correctly", async t => {
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
    "A0015526M, NAME",
    "Doctor",
    "Philosophy",
    "30 June 2015"
  ]);
  const transcriptTab = TemplateTabList.find(":nth-child(2)");
  await t.click(transcriptTab);
  await validateTextContent(t, RenderedCertificate, [
    "A0015526M, name",
    "A0015526M",
    "01/01/1905",
    "26/09/2019",
    "MASTER OF ARTS",
    "COMPLETED PROGRAMME",
    "DOCTOR OF PHILOSOPHY",
    "COMPLETED PROGRAMME",
    "2007/2008 SEMESTER 2",
    "EL6770",
    "GRADUATE RESEARCH SEMINAR",
    "TS5232",
    "PERFORMANCE, HISTORY AND CULTURAL MEMORY",
    "2008/2009 SEMESTER 1",
    "EN6102",
    "ADVANCED CRITICAL READING",
    "TS5101",
    "TEXT AND PERFORMANCE",
    "2010/2011 SEMESTER 1",
    "EN5244",
    "SHAKESPEARE AND LITERARY THEORY",
    "TS6770",
    "Graduate Research Seminar",
    "2010/2011 SEMESTER 2",
    "TS6660",
    "Independent Study",
    "TS6880A",
    "Figures of Theatre and Performance",
    "2011/2012 SEMESTER 1",
    "LAV1201",
    "Vietnamese 1",
    "2012/2013 SEMESTER 1",
    "2012/2013 SEMESTER 2"
  ]);
});
