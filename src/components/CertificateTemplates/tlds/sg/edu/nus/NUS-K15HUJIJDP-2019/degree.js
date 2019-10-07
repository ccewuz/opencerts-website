/* eslint-disable class-methods-use-this */
import React from "react";
import PropTypes from "prop-types";
import {
  DegreeScrollDataFeeder,
  Degree,
  renderSmallNUSLogo
} from "../common/degreeScrollFramework";
import { renderNUSSeal, renderImage, HUJI_LOGO } from "../common";

// custom logos
const renderLogos = () => {
  const styleLogo = {
    display: "float",
    height: "4.8cm"
  };
  return (
    <table width="100%">
      <tbody>
        <tr>
          <td width="50%">{renderSmallNUSLogo()}</td>
          <td width="50%" align="center">
            <img src={HUJI_LOGO} style={styleLogo} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

// construct title and name rendered with the signature
const getSigName = sigImage => {
  if (!sigImage) return null;
  const name = `${sigImage.title ? `${sigImage.title} ` : ""}${
    sigImage.name ? sigImage.name : ""
  }`;
  return name || null;
};

// custom signatures and seals
const renderSigs = dataSource => {
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
  let sig5;
  let name3;
  let name4;
  let name5;
  if (dataSource.additionalData.images) {
    sig1 = renderImage(dataSource.additionalData.images.TRUSTEES, 240, 75);
    sig2 = renderImage(dataSource.additionalData.images.PRESIDENT, 240, 75);
    sig3 = renderImage(dataSource.additionalData.images.HUJI_DEAN, 240, 75);
    sig4 = renderImage(dataSource.additionalData.images.HUJI_RECTOR, 240, 75);
    sig5 = renderImage(
      dataSource.additionalData.images.HUJI_PRESIDENT,
      240,
      75
    );
    name3 = getSigName(dataSource.additionalData.images.HUJI_DEAN);
    name4 = getSigName(dataSource.additionalData.images.HUJI_RECTOR);
    name5 = getSigName(dataSource.additionalData.images.HUJI_PRESIDENT);
  }
  const html = (
    <table style={styleSig}>
      <tbody>
        <tr>
          <td width="3%" />
          <td width="55%">{sig1}</td>
          <td>{sig3}</td>
        </tr>
        <tr>
          <td />
          <td valign="top">
            Chair, Board of Trustees
            <br />
            National University of Singapore
          </td>
          <td valign="top">
            Dean, Faculty of Medicine
            <br />
            The Hebrew University of Jerusalem
            <br />
            {name3}
          </td>
        </tr>
        <tr>
          <td />
          <td>{sig2}</td>
          <td>{sig4}</td>
        </tr>
        <tr>
          <td />
          <td>
            President
            <br />
            National University of Singapore
          </td>
          <td>
            Rector
            <br />
            The Hebrew University of Jerusalem
            <br />
            {name4}
          </td>
        </tr>
        <tr>
          <td />
          <td rowSpan="2" style={{ textAlign: "left" }}>
            {renderNUSSeal()}
          </td>
          <td>{sig5}</td>
        </tr>
        <tr>
          <td />
          <td valign="top">
            President
            <br />
            The Hebrew University of Jerusalem
            <br />
            {name5}
          </td>
        </tr>
      </tbody>
    </table>
  );

  return html;
};

// data feeder
const getDataFeeder = dataSource => {
  // data feeder
  const dataFeeder = new DegreeScrollDataFeeder();
  dataFeeder.logo = renderLogos();
  dataFeeder.studentName = dataSource.recipient.name.toUpperCase();
  dataFeeder.namePadding = "15px 0 10px";
  dataFeeder.postNameText =
    "having completed the requirements for the Joint Degree\nProgramme of the National University of Singapore and\nThe Hebrew University of Jerusalem,\nwas conferred the degree of";
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
  dataFeeder.sig = renderSigs(dataSource);
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
