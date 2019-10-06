/* eslint-disable class-methods-use-this */
import React from "react";
import PropTypes from "prop-types";
import {
  DegreeScrollDataFeeder,
  Degree,
  renderSmallNUSLogo
} from "../common/degreeScrollFramework";
import { renderNUSSeal, renderImage, renderVoid, SJTU_LOGO } from "../common";

// custom logos
const renderLogos = () => {
  const styleLogo = {
    display: "float",
    width: "11.09cm"
  };
  return (
    <table width="100%">
      <tbody>
        <tr>
          <td width="30%">{renderSmallNUSLogo()}</td>
          <td width="70%" align="center" valign="top">
            <img src={SJTU_LOGO} style={styleLogo} />
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
  let sig1;
  let sig2;
  let sig3;
  if (dataSource.additionalData.images) {
    sig1 = renderImage(dataSource.additionalData.images.TRUSTEES, 240, 75);
    sig2 = renderImage(dataSource.additionalData.images.PRESIDENT, 240, 75);
    sig3 = renderImage(
      dataSource.additionalData.images.SJTU_PRESIDENT,
      240,
      75
    );
  }
  const html = (
    <table style={styleSig}>
      <tbody>
        <tr>
          <td width="3%" />
          <td width="50%">{sig1}</td>
          <td />
        </tr>
        <tr>
          <td />
          <td>
            Chair, Board of Trustees
            <br />
            National University of Singapore
          </td>
          <td />
        </tr>
        <tr>
          <td />
          <td>{sig2}</td>
          <td>{sig3}</td>
        </tr>
        <tr>
          <td />
          <td>
            President
            <br />
            National University of Singapore
          </td>
          <td>
            President, Shanghai Jiao Tong University
            <br />
            Chairman, Degree Awarding Committee
          </td>
        </tr>
        <tr>
          <td>{renderVoid("0.3cm")}</td>
        </tr>
        <tr>
          <td />
          <td style={{ textAlign: "left" }}>{renderNUSSeal()}</td>
          <td />
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
  dataFeeder.spaceBeforeLogo = "1cm";
  dataFeeder.logo = renderLogos();
  dataFeeder.studentName = dataSource.recipient.name.toUpperCase();
  dataFeeder.namePadding = "15px 0 10px";
  dataFeeder.postNameText =
    "having completed the requirements for\nthe Joint Degree Programme of\nthe National University of Singapore and\nthe Shanghai Jiao Tong University was\nconferred the degree of";
  dataFeeder.degreeCode = dataSource.additionalData.degreeScroll[0].degreeCode;
  dataFeeder.degreeTitle =
    dataSource.additionalData.degreeScroll[0].degreeTitle;
  dataFeeder.honours = dataSource.additionalData.degreeScroll[0].honours;
  dataFeeder.major = dataSource.additionalData.degreeScroll[0].major;
  dataFeeder.breakBeforeMajor = false;
  dataFeeder.heightTitleDisplay = "2cm";
  dataFeeder.conferDate =
    dataSource.additionalData.degreeScroll[0].dateConferred;
  dataFeeder.spaceBeforeSig = "0.5cm"; // no space
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
