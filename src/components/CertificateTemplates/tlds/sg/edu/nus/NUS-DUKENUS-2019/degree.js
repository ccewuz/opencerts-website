import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import {
  capitalizedText,
  sassClassNames,
  renderVoid,
  renderImage,
  renderNUSLogo,
  renderNUSSeal,
  DUKE_LOGO,
  DUKE_SEAL,
  dateToWords
} from "../common";
import scss from "./degree.scss";

// construct class names
const cls = names => sassClassNames(names, scss);

class Degree extends Component {
  constructor(props) {
    super(props);
    this.dataSource = this.props.dataSource;
  }

  // render degree and honours
  renderDegree = degreeData => {
    const degreeTitleCase = capitalizedText(
      degreeData.degreeTitle.toLowerCase()
    );
    const htmlDegree = (
      <div className={cls("cert-degree")}>{degreeTitleCase}</div>
    );

    let htmlDegHonors = "";
    let honorsTitle = degreeData.honours ? degreeData.honours : "";
    if (honorsTitle) {
      honorsTitle = honorsTitle.replace(/1st/gi, "FIRST");
      honorsTitle = honorsTitle.replace(/2nd/gi, "SECOND");
      const degreeHonTitleCase = capitalizedText(honorsTitle.toLowerCase());
      htmlDegHonors = (
        <div className={cls("cert-degree")}>
          with&nbsp;
          {degreeHonTitleCase}
        </div>
      );
    }
    return (
      <Fragment>
        {htmlDegree}
        {htmlDegHonors}
      </Fragment>
    );
  };

  // render additional content
  renderContAdd = degreeData => {
    const html = [];
    const style1 = {
      width: "13.4cm",
      height: ".5cm",
      textAlign: "center",
      border: "0px solid"
    };
    if (degreeData.degreeTitle.indexOf("ART") !== -1)
      html.push(
        <div className={cls("cert-content")} style={style1}>
          of&nbsp;&nbsp;&nbsp;Arts&nbsp;(Honours) &nbsp;&nbsp;Joint&nbsp;&nbsp;
          Degree &nbsp;&nbsp;Programme
        </div>
      );
    else
      html.push(
        <div className={cls("cert-content")} style={style1}>
          of&nbsp;&nbsp;Science&nbsp;(Honours)&nbsp;Joint&nbsp; Degree
          &nbsp;Programme
        </div>
      );
    return html;
  };

  // render content
  renderContent() {
    const style1 = {
      width: "13.4cm",
      height: "0.8cm",
      textAlign: "center",
      border: "0px solid"
    };
    const degreeData = this.dataSource.additionalData.degreeScroll[0];
    const html = (
      <table width="100%">
        <tbody>
          <tr>
            <td>
              {/* This is to certify that following the completion of */}
              <div className={cls("cert-content")} style={style1}>
                have conferred on
              </div>
            </td>
          </tr>

          <tr>
            <td>
              {/* student name */}
              <div className={cls("cert-name")}>
                {this.dataSource.recipient.name.toUpperCase()}
              </div>
            </td>
          </tr>
          <tr>
            <td>
              {/* the joint degree of */}
              <div className={cls("cert-content1")}>the joint degree of</div>
            </td>
          </tr>
          <tr>
            <td>
              {/* degree & honours */}
              {this.renderDegree(degreeData)}
            </td>
          </tr>
          <tr>
            <td>
              {/* issue date */}
              {this.renderDateConferred(degreeData.dateConferred)}
            </td>
          </tr>
        </tbody>
      </table>
    );
    return html;
  }

  // render signatures
  renderSigs = dataSource => {
    let sig1;
    let sig2;
    let sig3;
    let sig4;
    let sig5;
    if (dataSource.additionalData.images) {
      sig1 = renderImage(
        dataSource.additionalData.images.DUKE_TRUSTEES,
        180,
        60
      );
      sig2 = renderImage(
        dataSource.additionalData.images.DUKE_PRESIDENT,
        180,
        60
      );
      sig3 = renderImage(dataSource.additionalData.images.DUKE_DEAN, 180, 60);
      sig4 = renderImage(dataSource.additionalData.images.TRUSTEES, 180, 60);
      sig5 = renderImage(dataSource.additionalData.images.PRESIDENT, 180, 60);
    }
    const styleNUSSeal = {
      display: "block",
      marginTop: "5px",
      marginLeft: "30px",
      width: "4.25cm"
    };
    const html = (
      <table width="100%">
        <tbody>
          <tr>
            <td align="center" width="33%">
              {/* signature 1 - DUKE Trustees */}
              <div className={cls("cert-sig")}>{sig1}</div>
            </td>
            <td width="34%"> {/* blank */}</td>
            <td align="center" width="34%">
              {/* signature 4 - NUS Trustees */}
              <div className={cls("cert-sig")}>{sig4}</div>
            </td>
          </tr>
          <tr>
            <td>
              <div className={cls("cert-sig")}>
                &nbsp;&nbsp;Chair, Board of Trustees
                <br />
                &nbsp;&nbsp;Duke University
              </div>
            </td>
            <td rowSpan="2" valign="bottom">
              {/* signature 3 - DUKE Dean */}
              <div className={cls("cert-sig")}>{sig3}</div>
            </td>
            <td>
              <div className={cls("cert-sig")}>
                &nbsp;&nbsp; Chair, Board of Trustees
                <br />
                &nbsp;&nbsp; National University of Singapore
              </div>
            </td>
          </tr>
          <tr>
            <td align="center">
              {/* signature 2 - DUKE President */}
              <div className={cls("cert-sig")}>{sig2}</div>
            </td>
            <td align="center">
              {/* signature 5 - NUS President */}
              <div className={cls("cert-sig")}>{sig5}</div>
            </td>
          </tr>
          <tr>
            <td>
              <div className={cls("cert-sig")}>
                &nbsp;&nbsp; President
                <br />
                &nbsp;&nbsp; Duke University
              </div>
            </td>
            <td>
              <div className={cls("cert-sig")}>
                &nbsp;&nbsp; Dean
                <br />
                &nbsp;&nbsp; DUKE-NUS Medical School
              </div>
            </td>
            <td>
              <div className={cls("cert-sig")}>
                &nbsp;&nbsp; President
                <br />
                &nbsp;&nbsp; National University of Singapore
              </div>
            </td>
          </tr>
          <tr>
            <td>{this.renderDUKESeal()}</td>
            <td />
            <td>{renderNUSSeal(null, styleNUSSeal)}</td>
          </tr>
        </tbody>
      </table>
    );
    return html;
  };

  // render DUKE seal
  renderDUKESeal = () => (
    <img src={DUKE_SEAL} className={cls("cert-duke-seal")} />
  );

  // render date conferred
  renderDateConferred = dateConferred => {
    const words = dateToWords(dateConferred);
    const html = (
      <Fragment>
        <div className={cls("cert-date")}>Given on {words.dayMonth},</div>
        <div className={cls("cert-date")}>{words.year}</div>
      </Fragment>
    );
    return html;
  };

  renderHeader = () => {
    const styleNUSLogo = {
      marginLeft: "auto",
      marginRight: "auto",
      display: "block",
      width: "2.7cm",
      height: "3.2cm",
      textShadow: "1px 0 #888888"
    };
    const html = (
      <table width="100%">
        <tbody>
          <tr>
            <td width="20%">
              <img src={DUKE_LOGO} className={cls("cert-duke")} />
            </td>
            <td className={cls("cert-td3")}>
              <div className={cls("cert-td31")}>
                <br />
                <strong>
                  The Faculty and Trustees of Duke University and <br />
                </strong>
              </div>
              <div className={cls("cert-td31")}>
                <strong>
                  the Chancellor of the National University of Singapore,
                  <br />
                </strong>
              </div>
              <div className={cls("cert-td31")}>
                <strong>
                  in recognition of the successful completion of the course of
                  study required by the <br />
                </strong>
              </div>
              <div className={cls("cert-td32")}>
                <strong>Duke-NUS Medical School</strong>
              </div>
            </td>
            <td width="20%">
              <table width="100%">
                <tbody>
                  <tr>
                    <td className={cls("cert-td41")}>
                      <strong>
                        NATIONAL UNIVERSITY <br />
                        OF SINGAPORE
                      </strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div>{renderNUSLogo(null, styleNUSLogo)}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    );
    return html;
  };

  // main render
  render() {
    const html = (
      <div className={cls("nus-degree")}>
        <div className={cls("a4-portrait")}>
          <article>
            <div style={{ height: "auto", border: "0px solid" }}>
              {renderVoid("0.63cm")}
              {this.renderHeader()}
              {this.renderContent()}
            </div>
            <div style={{ marginTop: "-.5cm" }}>
              {this.renderSigs(this.dataSource)}
            </div>
          </article>
        </div>
      </div>
    );
    return html;
  }
}

Degree.propTypes = {
  dataSource: PropTypes.object.isRequired
};

const Template = ({ certificate }) => {
  // 1123px is width of A4 portrait (29.7cm)
  const ratio = (window.innerWidth - 30) / 1123;
  const scale =
    ratio < 1
      ? {
          transform: `scale(${ratio}, ${ratio})`,
          transformOrigin: "top left"
        }
      : null;
  const html = (
    <div style={scale}>
      <Degree dataSource={certificate} />
    </div>
  );
  return html;
};
export default Template;
Template.propTypes = {
  certificate: PropTypes.object.isRequired
};
