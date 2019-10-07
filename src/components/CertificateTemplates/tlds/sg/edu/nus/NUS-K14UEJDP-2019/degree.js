/* eslint-disable class-methods-use-this */
import React from "react";
import PropTypes from "prop-types";
import {
  DegreeScrollDataFeeder,
  Degree,
  renderSmallNUSLogo
} from "../common/degreeScrollFramework";
import { renderNUSSeal, renderImage, UOE_LOGO } from "../common";

// custom logos
const renderLogos = () => {
  const styleLogo = {
    display: "float",
    width: "4.8cm"
  };
  return (
    <table width="100%">
      <tbody>
        <tr>
          <td width="50%">{renderSmallNUSLogo()}</td>
          <td width="50%" align="center" valign="top">
            <img src={UOE_LOGO} style={styleLogo} />
          </td>
        </tr>
      </tbody>
    </table>
  );
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
  const sig1 = renderImage(dataSource.additionalData.images.TRUSTEES, 240, 75);
  const sig2 = renderImage(dataSource.additionalData.images.PRESIDENT, 240, 75);
  const html = (
    <table style={styleSig}>
      <tbody>
        <tr>
          <td width="3%" />
          <td width="60%">{sig1}</td>
          <td rowSpan="4" style={{ textAlign: "center" }}>
            {renderNUSSeal()}
          </td>
        </tr>
        <tr>
          <td />
          <td>
            Chair, Board of Trustees
            <br />
            National University of Singapore
          </td>
        </tr>
        <tr>
          <td />
          <td>{sig2}</td>
        </tr>
        <tr>
          <td />
          <td>
            President
            <br />
            National University of Singapore
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
  dataFeeder.spaceAfterLogo = "1.8cm";
  dataFeeder.studentName = dataSource.recipient.name.toUpperCase();
  dataFeeder.namePadding = "15px 0 10px";
  dataFeeder.postNameText =
    "having completed the requirements for\nthe Joint Degree Programme of the National\nUniversity of Singapore and the University\nof Edinburgh was conferred the degree of";
  dataFeeder.degreeCode = dataSource.additionalData.degreeScroll[0].degreeCode;
  dataFeeder.degreeTitle =
    dataSource.additionalData.degreeScroll[0].degreeTitle;
  dataFeeder.honours = dataSource.additionalData.degreeScroll[0].honours;
  dataFeeder.major = dataSource.additionalData.degreeScroll[0].major;
  dataFeeder.breakBeforeMajor = false;
  dataFeeder.heightTitleDisplay = "2cm";
  dataFeeder.conferDate =
    dataSource.additionalData.degreeScroll[0].dateConferred;
  dataFeeder.spaceBeforeSig = "2cm"; // no space
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
