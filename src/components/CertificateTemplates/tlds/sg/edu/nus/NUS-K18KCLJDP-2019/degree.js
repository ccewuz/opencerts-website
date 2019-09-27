/* eslint-disable class-methods-use-this */
import React from "react";
import PropTypes from "prop-types";
import {
  DegreeScrollDataFeeder,
  Degree,
  renderSmallNUSLogo
} from "../common/degreeScrollFramework";
import {
  renderNUSSeal,
  renderImage,
  renderVoid,
  KCL_LOGO,
  KCL_SEAL
} from "../common";

// custom logos
const renderLogos = homeUnivIsNUS => {
  const styleLogo = {
    display: "float",
    height: "5.0cm"
  };
  const kclLogo = <img src={KCL_LOGO} style={styleLogo} />;
  return (
    <table width="100%">
      <tbody>
        <tr>
          <td>{renderVoid("1.2cm")}</td>
        </tr>
        <tr>
          <td width="50%" align="center">
            {homeUnivIsNUS ? renderSmallNUSLogo() : kclLogo}
          </td>
          <td width="50%" align="center">
            {homeUnivIsNUS ? kclLogo : renderSmallNUSLogo()}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

// render KCL seal
const renderKCLSeal = () => (
  <img src={KCL_SEAL} style={{ display: "float", width: "4.95cm" }} />
);

// custom signatures and seals
const renderSigs = (dataSource, homeUnivIsNUS) => {
  const styleSig = {
    display: "float",
    width: "100%",
    fontSize: "12pt",
    fontFamily: "'Century Schoolbook', Georgia, serif",
    fontStyle: "italic",
    textAlign: "left"
  };
  let sig1;
  let sig2;
  let sig3;
  let sig4;
  if (dataSource.additionalData.images) {
    sig1 = renderImage(dataSource.additionalData.images.TRUSTEES, 240, 75);
    sig2 = renderImage(dataSource.additionalData.images.PRESIDENT, 240, 75);
    sig3 = renderImage(dataSource.additionalData.images.KCL_CHAIRMAN, 240, 75);
    sig4 = renderImage(dataSource.additionalData.images.KCL_PRESIDENT, 240, 75);
  }
  const sigUpLeft = homeUnivIsNUS ? sig1 : sig3;
  const sigBotLeft = homeUnivIsNUS ? sig2 : sig4;
  const sigUpRight = homeUnivIsNUS ? sig3 : sig1;
  const sigBotRight = homeUnivIsNUS ? sig4 : sig2;
  const sigName1 = (
    <td>
      Chair, Board of Trustees
      <br />
      National University of Singapore
    </td>
  );
  const sigName2 = (
    <td>
      President
      <br />
      National University of Singapore
    </td>
  );
  const sigName3 = (
    <td>
      Chairman of Council
      <br />
      King&apos;s College London
    </td>
  );
  const sigName4 = (
    <td>
      Principal &amp; President
      <br />
      King&apos;s College London
    </td>
  );
  const sigNameUpLeft = homeUnivIsNUS ? sigName1 : sigName3;
  const sigNameUpRight = homeUnivIsNUS ? sigName3 : sigName1;
  const sigNameBotLeft = homeUnivIsNUS ? sigName2 : sigName4;
  const sigNameBotRight = homeUnivIsNUS ? sigName4 : sigName2;
  const sealLeft = homeUnivIsNUS ? renderNUSSeal() : renderKCLSeal();
  const sealRight = homeUnivIsNUS ? renderKCLSeal() : renderNUSSeal();

  const html = (
    <table style={styleSig}>
      <tbody>
        <tr>
          <td width="3%" />
          <td width="60%">{sigUpLeft}</td>
          <td>{sigUpRight}</td>
        </tr>
        <tr>
          <td />
          {sigNameUpLeft}
          {sigNameUpRight}
        </tr>
        <tr>
          <td />
          <td>{sigBotLeft}</td>
          <td>{sigBotRight}</td>
        </tr>
        <tr>
          <td />
          {sigNameBotLeft}
          {sigNameBotRight}
        </tr>
        <tr>
          <td>{renderVoid("0.3cm")}</td>
        </tr>
        <tr>
          <td />
          <td style={{ textAlign: "left" }}>{sealLeft}</td>
          <td style={{ textAlign: "left" }}>{sealRight}</td>
        </tr>
      </tbody>
    </table>
  );

  return html;
};

// data feeder
const getDataFeeder = dataSource => {
  // is the home university NUS?
  const homeUnivIsNUS =
    dataSource.additionalData.degreeScroll[0].type === "K18A NUS-KCL";
  // data feeder
  const dataFeeder = new DegreeScrollDataFeeder();
  dataFeeder.logo = renderLogos(homeUnivIsNUS);
  dataFeeder.studentName = dataSource.recipient.name.toUpperCase();
  dataFeeder.namePadding = "15px 0 10px";
  dataFeeder.postNameText = homeUnivIsNUS
    ? "having completed the requirements for\nthe Joint Degree Programme of the\nNational University of Singapore and\nKing's College London,\nwas conferred the degree of"
    : "having completed the requirements for\nthe Joint Degree Programme of\nKing's College London and the\nNational University of Singapore,\nwas conferred the degree of";
  dataFeeder.degreeCode = dataSource.additionalData.degreeScroll[0].degreeCode;
  dataFeeder.degreeTitle =
    dataSource.additionalData.degreeScroll[0].degreeTitle;
  dataFeeder.honours = dataSource.additionalData.degreeScroll[0].honours;
  dataFeeder.major = dataSource.additionalData.degreeScroll[0].major;
  dataFeeder.breakBeforeMajor = false;
  dataFeeder.heightTitleDisplay = "2cm";
  dataFeeder.conferDate =
    dataSource.additionalData.degreeScroll[0].dateConferred;
  dataFeeder.spaceBeforeSig = null; // no space
  dataFeeder.sig = renderSigs(dataSource, homeUnivIsNUS);
  return dataFeeder;
};

const Template = ({ certificate }) => {
  // JSON data source
  const jsonData = certificate;

  // data feeder
  const dataFeeder = getDataFeeder(jsonData);

  // 794px is width of A4 portrait (21cm)
  const ratio = (window.innerWidth - 30) / 794;
  const scale =
    ratio < 1
      ? {
          transform: `scale(${ratio}, ${ratio})`,
          transformOrigin: "top left"
        }
      : null;
  const html = (
    <div style={scale}>
      <Degree dataFeeder={dataFeeder} />
    </div>
  );
  return html;
};
export default Template;
Template.propTypes = {
  certificate: PropTypes.object.isRequired
};
