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

test("NUS-K14UEJDP-2019 degree scroll is rendered correctly", async t => {
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
    "A0080703N, NAME",
    "Doctor",
    "Philosophy",
    "31 January 2016"
  ]);
  const transcriptTab = TemplateTabList.find(":nth-child(2)");
  await t.click(transcriptTab);
  await validateTextContent(t, RenderedCertificate, [
    "A0080703N, name",
    "A0080703N",
    "01/01/1905",
    "26/09/2019",
    "DOCTOR OF PHILOSOPHY",
    "COMPLETED PROGRAMME",
    "2010/2011 SEMESTER 2",
    "HY6660",
    "INDEPENDENT STUDY",
    "HY6770",
    "GRADUATE RESEARCH SEMINAR",
    "2011/2012 SEMESTER 1",
    "2011/2012 SEMESTER 2"
  ]);
});
