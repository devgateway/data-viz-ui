import React from "react";
import { Container } from "semantic-ui-react";

import Background from "./Background";
import Stomach from "./Stomach";
import Liver from "./Liver";
import Bounds from "./Bounds";
import Blood from "./Blood";
import Lungs from "./Lungs";
import Head from "./Head";
import Eyes from "./Eyes";
import Brain from "./Brain";
import Heart from "./Heart";
import Erectile from "./Erectile";
import * as d3 from "d3"; // d3 plugin

import Ectopic from "./Ectopic";
import { injectIntl, FormattedMessage } from "react-intl";
import messages_en from "../../translations/en.json";
import messages_fr from "../../translations/fr.json";
import messages_am from "../../translations/am.json";


import getDeviceType from "../../utils/deviceType";

class Body extends React.Component {
  constructor(props) {
    super(props);
    // No llames this.setState() aquí!
    this.state = {
      counter: 0,
      isMobile: ["mobile", "tablet"].includes(getDeviceType()),
      isClicked: false,
      selectedOption: "Cancers",
      orientation: this.getScreenOrientation(),
    };
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.updateLayout = this.updateLayout.bind(this);
    this.updateSvgLabels = this.updateSvgLabels.bind(this);
    this.handleTextClick = this.handleTextClick.bind(this);
    this.handleOrientationChange = this.handleOrientationChange.bind(this);
    this.messages = {
      en: messages_en,
      fr: messages_fr,
      am: messages_am,
    }
  }

  updateLayout() {
    this.setState({ isMobile: ["mobile", "tablet"].includes(getDeviceType()) });
  }

  getScreenOrientation() {
    return (
      window.screen.orientation?.type ||
      (window.innerWidth > window.innerHeight
        ? "landscape-primary"
        : "portrait-primary")
    );
  }

  isIphone() {
    const userAgent = navigator.userAgent.toLowerCase();
    return /iphone/i.test(userAgent);
  }

  handleOrientationChange() {
    setTimeout(() => {
      this.setState({ orientation: this.getScreenOrientation() }, () => {
        this.updateLayout();
        this.updateSvgLabels();
      });
    }, 100);
  }

  handleTextClick(e) {
    if (!this.state.isMobile) return;

    const svg = e.target.closest("svg");
    const titleText = e.target.closest(".title");
    const btn = e.target.closest(".title-rect");

    if (titleText || btn) {
      // Remove the 'on' class from all .title, .title-rect, and .title-line elements
      [...svg.querySelectorAll(".title, .title-rect, .title-line")].forEach(
        (node) => node.classList.remove("on")
      );

      const selectedElement = titleText || btn;
      const selectedOption = selectedElement.getAttribute('data-option');

      // Add the 'on' class to the clicked title and title-rect
      selectedElement.classList.add("on");

      // Find and add 'on' class to the corresponding rect if we clicked text, or text if we clicked rect
      const parentG = selectedElement.closest("g");
      const correspondingRect = parentG.querySelector(".title-rect");
      const correspondingText = parentG.querySelector(".title");

      if (correspondingRect) correspondingRect.classList.add("on");
      if (correspondingText) correspondingText.classList.add("on");

      // Add the 'on' class to the corresponding title-line
      const titleLine = parentG.querySelector(".title-line");
      if (titleLine) {
        titleLine.classList.add("on");
      }

      // Update the selected option state using data attribute
      if (selectedOption) {
        this.setState({
          selectedOption: selectedOption,
        });
      }
    }
  }

  onMouseOut() {
    d3.select(".body.parts")
      .selectAll("g.system")
      .transition()
      .duration(0)
      .delay(200)
      .style("opacity", 1);
    d3.select(".body.parts").selectAll("circle").remove();
    d3.select(".body.parts").selectAll("line").remove();
  }

  onMouseOver(selector, source, target) {
    const root = d3.select(".body.parts");

    const element = root.select(selector);
    if (selector) {
      root.selectAll("g.system").transition().duration(200).style("opacity", 0);
      element.transition().style("opacity", 1);
    }
    const bbox = source.node().getBBox();

    let x1, y1, x2, y2;
    if (bbox.x < 0) {
      ///Left side
      x1 = bbox.x + bbox.width + 5;
      x2 = x1 > 0 ? 30 : -5;
      y1 = bbox.y + bbox.height / 2;
      y2 = bbox.y + bbox.height / 2;
    } else {
      x1 = bbox.x - 5;
      x2 = 140;
      y1 = bbox.y + bbox.height / 2;
      y2 = bbox.y + bbox.height / 2;
    }

    root
      .select("svg")
      .append("line")
      .attr("x1", x1)
      .attr("y1", y1)
      .attr("x2", x1)
      .attr("y2", y1)
      .transition()
      .duration(100)
      .attr("x2", x2)
      .attr("y2", y2);

    root
      .select("svg")
      .append("line")
      .attr("x1", x2)
      .attr("y1", bbox.y + bbox.height / 2)
      .attr("x2", x2)
      .attr("y2", bbox.y + bbox.height / 2)
      .transition()
      .duration(100)
      .delay(100)
      .attr("x2", target.tx)
      .attr("y2", target.ty);

    root
      .select("svg")
      .append("circle")
      .attr("r", 0)
      .attr("cx", target.tx)
      .attr("cy", target.ty)
      .attr("opacity", 0.6)
      .attr("fill", "#000")
      .transition()
      .delay(200)
      .duration(30)
      .attr("r", 6);

    //  <line stroke="#000" x1="" y1="153.25657745748686" x2="-57.0522107618267" y2="110.24777579617485"/>
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateLayout);
    if (window.screen.orientation) {
      window.screen.orientation.addEventListener(
        "change",
        this.handleOrientationChange
      );
    } else {
      window.addEventListener("resize", this.handleOrientationChange);
    }
    this.updateLayout();
    this.updateSvgLabels();

    // Add the "on" class on page refresh based on the selected option
    this.addOnClassToSelectedElements();
  }

  addOnClassToSelectedElements() {
    const { selectedOption } = this.state;
    const svg = document.querySelector("svg");

    if (!svg) return;

    // Remove 'on' class from all elements first
    [...svg.querySelectorAll(".title, .title-rect, .title-line")].forEach(
      (node) => node.classList.remove("on")
    );

    // Find elements with matching data-option attribute
    const selectedTitleText = svg.querySelector(`[data-option="${selectedOption}"].title`);
    const selectedTitleRect = svg.querySelector(`[data-option="${selectedOption}"].title-rect`);

    // Find the parent group and get the title-line
    let selectedTitleLine = null;
    if (selectedTitleText || selectedTitleRect) {
      const parentG = (selectedTitleText || selectedTitleRect).closest('g');
      selectedTitleLine = parentG ? parentG.querySelector('.title-line') : null;
    }

    // Add the 'on' class if the elements exist
    if (selectedTitleText) selectedTitleText.classList.add("on");
    if (selectedTitleRect) selectedTitleRect.classList.add("on");
    if (selectedTitleLine) selectedTitleLine.classList.add("on");
  }

  updateSvgLabels() {
    const root = d3.select(".body.parts");
    const intl = this.props.intl;
    const _messages = this.messages[intl.locale];

    const left = [
      {
        label: intl.formatMessage({
          id: "oropharyngeal.cancer",
          defaultMessage: _messages["oropharyngeal.cancer"],
        }),
        selector: ".stomach",
        tx: 90,
        ty: 60,
      },
      {
        label: intl.formatMessage({
          id: "laryngeal.cancer",
          defaultMessage: _messages["laryngeal.cancer"],
        }),
        selector: ".larynx",
        tx: 80,
        ty: 90,
      },
      {
        label: intl.formatMessage({
          id: "oesophageal.ancer",
          defaultMessage: _messages["oesophageal.cancer"],
        }),
        selector: ".stomach",
        tx: 77,
        ty: 95,
      },

      {
        label: intl.formatMessage({
          id: "tracheal.bronchial.lung.cancer",
          defaultMessage: _messages["tracheal.bronchial.lung.cancer"],
        }),
        selector: ".larynx",
        tx: intl.locale === "en" ? 80 : 90,
        ty: 120,
      },

      {
        label: intl.formatMessage({
          id: "acute.myeloid.leukaemia",
          defaultMessage: _messages["acute.myeloid.leukaemia"],
        }),
        selector: ".blood",
        tx: 90,
        ty: 200,
      },
      {
        label: intl.formatMessage({
          id: "stomach.cancer",
          defaultMessage: _messages["stomach.cancer"],
        }),
        selector: ".stomach",
        tx: 80,
        ty: 150,
      },
      {
        label: intl.formatMessage({
          id: "liver.cancer",
          defaultMessage: _messages["liver.cancer"],
        }),
        selector: ".stomach",
        tx: 80,
        ty: 150,
      },
      {
        label: intl.formatMessage({
          id: "pancreatic.cancer",
          defaultMessage: _messages["pancreatic.cancer"],
        }),
        selector: ".stomach",
        tx: 105,
        ty: 160,
      },
      {
        label: intl.formatMessage({
          id: "colorectal.cancer",
          defaultMessage: _messages["colorectal.cancer"],
        }),
        selector: ".stomach",
        tx: 85,
        ty: 250,
      },
      {
        label: intl.formatMessage({
          id: "kidney.cancer",
          defaultMessage: _messages["kidney.cancer"],
        }),
        selector: ".stomach",
        tx: 65,
        ty: 185,
      },
      {
        label: intl.formatMessage({
          id: "bladder.cancer",
          defaultMessage: _messages["bladder.cancer"],
        }),
        selector: ".erectile",
        tx: 85,
        ty: 250,
      },
      {
        label: intl.formatMessage({
          id: "cervical.cancer",
          defaultMessage: _messages["cervical.cancer"],
        }),
        selector: ".Ectopic",
        tx: 85,
        ty: 275,
      },
    ];

    const right = [
      {
        label: intl.formatMessage({
          id: "stroke",
          defaultMessage: _messages["stroke"],
        }),
        selector: ".brain",
        tx: 97,
        ty: 39,
      },
      {
        label: intl.formatMessage({
          id: "blindness.decreased.eyesight",
          defaultMessage: _messages["blindness.decreased.eyesight"],
        }),
        selector: ".eyes",
        tx: 97,
        ty: 39,
      },
      {
        label: intl.formatMessage({
          id: "periodontitis",
          defaultMessage: _messages["periodontitis"],
        }),
        selector: ".stomach",
        tx: 90,
        ty: 60,
      },
      {
        label: intl.formatMessage({
          id: "aortic.aneurysm",
          defaultMessage: _messages["aortic.aneurysm"],
        }),
        selector: ".blood",
        tx: 90,
        ty: 120,
      },
      {
        label: intl.formatMessage({
          id: "heart.disease",
          defaultMessage: _messages["heart.disease"],
        }),
        selector: ".heart",
        tx: 90,
        ty: 140,
      },
      {
        label: intl.formatMessage({
          id: "pneumonia",
          defaultMessage: _messages["pneumonia"],
        }),
        selector: ".lungs",
        tx: 85,
        ty: 130,
      },
      {
        label: intl.formatMessage({
          id: "atherosclerotic.peripheral.vascular.disease",
          defaultMessage:
            _messages["atherosclerotic.peripheral.vascular.disease"],
        }),
        selector: ".blood",
        tx: 90,
        ty: 380,
      },
      {
        label: intl.formatMessage({
          id: "copd",
          defaultMessage: _messages["copd"],
        }),
        selector: ".lungs",
        tx: 85,
        ty: 130,
      },
      {
        label: intl.formatMessage({
          id: "tuberculosis",
          defaultMessage: _messages["tuberculosis"],
        }),
        selector: ".lungs",
        tx: 85,
        ty: 130,
      },
      {
        label: intl.formatMessage({
          id: "asthma",
          defaultMessage: _messages["asthma"],
        }),
        selector: ".lungs",
        tx: 85,
        ty: 130,
      },
      {
        label: intl.formatMessage({
          id: "diabetes",
          defaultMessage: _messages["diabetes"],
        }),
        selector: ".stomach",
        tx: 105,
        ty: 160,
      },
      {
        label: intl.formatMessage({
          id: "hip.fractures",
          defaultMessage: _messages["hip.fractures"],
        }),
        selector: ".bounds",
        tx: 90,
        ty: 230,
      },
      {
        label: intl.formatMessage({
          id: "rheumatoid.arthritis",
          defaultMessage: _messages["rheumatoid.arthritis"],
        }),
        selector: ".bounds",
        tx: 134,
        ty: 275,
      },
      {
        label: intl.formatMessage({
          id: "impaired.immune.function",
          defaultMessage: _messages["impaired.immune.function"],
        }),
        selector: null,
        tx: 85,
        ty: 130,
      },
      {
        label: intl.formatMessage({
          id: "erectile.dysfunction",
          defaultMessage: _messages["erectile.dysfunction"],
        }),
        selector: ".erectile",
        tx: 107,
        ty: 290,
      },
      {
        label: intl.formatMessage({
          id: "reduced.fertility.men",
          defaultMessage: _messages["reduced.fertility.men"],
        }),
        selector: ".erectile",
        tx: 95,
        ty: 290,
      },
      {
        label: intl.formatMessage({
          id: "ectopic.pregnancy",
          defaultMessage: _messages["ectopic.pregnancy"],
        }),
        selector: ".Ectopic",
        tx: 90,
        ty: 250,
      },
      {
        label: intl.formatMessage({
          id: "reduced.fertility.women",
          defaultMessage: _messages["reduced.fertility.women"],
        }),
        selector: ".Ectopic",
        tx: 95,
        ty: 242,
      },
    ];

    // Clear existing labels
    root.select("svg").selectAll("text.label").remove();

    const { selectedOption, isMobile } = this.state;

    const data = selectedOption === "Cancers" ? left : right;

    let sy = 60;

    const calculateX = (d, i) => {
      if(isMobile && this.props.intl.locale === "am") return 140;
      if (isMobile) return 160;
      return -250;
    };

    if (intl.locale === "en") {
      if (!isMobile) {
        sy = 90;
        root
          .select("svg")
          .selectAll("text.left")

          .data(left)
          .enter()
          .append("text")
          .attr("class", "label")
          .attr("x", (d, i) => -250)
          .attr("y", (d, i) => {
            return sy + i * 25;
          })
          .text((d) => d.label);

        root
          .select("svg")
          .selectAll("text.right")
          .data(right)
          .enter()
          .append("text")
          .attr("class", "label")
          .attr("x", (d, i) => 200)
          .attr("y", (d, i) => {
            return sy + i * 25;
          })
          .text((d) => d.label);
      } else {
        root
          .select("svg")
          .selectAll("text.label")
          .data(data)
          .enter()
          .append("text")
          .attr("class", "label")
          .attr("x", calculateX)
          .attr("y", (d, i) => sy + i * 25)
          .text((d) => d.label);
      }
    } else if (intl.locale === "fr" || intl.locale === "am") {
      if (!isMobile) {
        root
          .select("svg")
          .selectAll("text.left")

          .data(left)
          .enter()
          .append("text")
          .attr("class", "label")
          .attr("x", (d, i) => -280)
          .attr("y", (d, i) => {
            return sy + i * 25;
          })
          .text((d) => d.label);

        root
          .select("svg")
          .selectAll("text.right")
          .data(right)
          .enter()
          .append("text")
          .attr("class", "label")
          .attr("x", (d, i) => 200)
          .attr("y", (d, i) => {
            return sy + i * 25;
          })
          .text((d) => d.label);
      } else {
        root
          .select("svg")
          .selectAll("text.label")
          .data(data)
          .enter()
          .append("text")
          .attr("class", "label")
          .attr("x", calculateX)
          .attr("y", (d, i) => sy + i * 25)
          .text((d) => d.label);
      }
    }
    root
      .select("svg")
      .selectAll("text.label")
      .on("mouseover", (event, d) => {
        this.onMouseOver(d.selector, d3.select(event.currentTarget), d, {
          tx: d.tx,
          ty: d.ty,
        });
      })
      .on("mouseout", (event, d) => {
        this.onMouseOut();
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.selectedOption !== this.state.selectedOption ||
      prevState.orientation !== this.state.orientation
    ) {
      this.updateSvgLabels();
      this.addOnClassToSelectedElements(); // Apply "on" class after updates
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateLayout);
    if (window.screen.orientation) {
      window.screen.orientation.removeEventListener(
        "change",
        this.handleOrientationChange
      );
    } else {
      window.removeEventListener("resize", this.handleOrientationChange);
    }
  }

  localeYDims = {
    en: "60",
    fr: "40",
    am: "40",
  };

  localeXdims = {
    en: "-250",
    fr: "-280",
    am: "-280",
  };

  titleDims = {
    am: 160,
    fr: 180,
    en: 180,
  }

  titleLineWidths = {
    Cancers: {
      am: 125,  // Wider for Amharic text
      fr: 58,
      en: 58,
    },
    OtherConditions: {
      am: 158, // Much wider for Amharic text
      fr: 118,
      en: 118,
    },
  }

  mobileOptions = {
    Cancers: {
      x: this.titleDims[this.props.intl.locale],
      y: 25,
    },
    OtherConditions: {
      x: this.isIphone() && this.props.intl.locale === "am" ? 370 : 350,
      y: 25,
    },
    viewBoxDims: "0 0 550 520",
  };

  render() {
    return (
      <Container className="body parts">
        <svg
          className="body root"
          viewBox={
            this.state.isMobile
              ? this.mobileOptions["viewBoxDims"]
              : "-300 0 900 520"
          }
          xmlns="http://www.w3.org/2000/svg"
        >
          <Background className="backGround" />
          <Bounds className="system bounds" />
          <Head className="system head" />

          <Lungs className="system larynx" />
          <Lungs className="system lungs" />
          <Stomach className="system stomach" />
          <Liver className="system liver" />
          <Brain className="system brain" />
          <Eyes className="system eyes" />
          <Blood className="system blood" />
          <Heart className="system heart" />
          <Erectile className="system erectile" />
          <Ectopic className="system Ectopic" />
          <g onClick={this.handleTextClick}>
            <rect
              className="title-rect"
              data-option="Cancers"
              x={
                this.state.isMobile
                  ? this.mobileOptions["Cancers"]["x"] - 20
                  : ""
              }
              y={
                this.state.isMobile
                  ? this.mobileOptions["Cancers"]["y"] - 20
                  : this.localeYDims[this.props.intl.locale]
              }
              rx="5"
              ry="5"
              width="100"
              height="30"
            />
            <text
              x={
                this.state.isMobile
                  ? this.mobileOptions["Cancers"]["x"]
                  : this.localeXdims[this.props.intl.locale]
              }
              y={
                this.state.isMobile
                  ? this.mobileOptions["Cancers"]["y"]
                  : this.localeYDims[this.props.intl.locale]
              }
              className="title"
              data-option="Cancers"
            >
              <FormattedMessage
                id="ailments.title"
                defaultMessage="{cancers}"
                values={{ cancers: this.messages[this.props.intl.locale]["ailments.title"] }}
              />
            </text>
            {this.state.isMobile && (
              <rect
                className="title-line"
                x={
                  this.state.isMobile
                    ? this.mobileOptions["Cancers"]["x"] - 18
                    : "-250"
                }
                y={
                  this.state.isMobile
                    ? this.mobileOptions["Cancers"]["y"] + 7
                    : ""
                }
                width={this.titleLineWidths["Cancers"][this.props.intl.locale] || this.titleLineWidths["Cancers"]["en"]}
                height="3"
                fill="#E5EBED"
              />
            )}
          </g>
          <g onClick={this.handleTextClick}>
            <rect
              className="title-rect"
              data-option="OtherConditions"
              x={
                this.state.isMobile
                  ? this.mobileOptions["OtherConditions"]["x"] - 65
                  : ""
              }
              y={
                this.state.isMobile
                  ? this.mobileOptions["OtherConditions"]["y"] - 20
                  : this.localeYDims[this.props.intl.locale]
              } // Ensure the default desktop y-position
              rx="5"
              ry="5"
              width="155"
              height="30"
            />
            <text
              x={
                this.state.isMobile
                  ? this.mobileOptions["OtherConditions"]["x"] - 50
                  : "200"
              } // Desktop remains "200"
              y={
                this.state.isMobile
                  ? this.mobileOptions["OtherConditions"]["y"]
                  : this.localeYDims[this.props.intl.locale]
              } // Ensure the default desktop y-position
              className="title"
              data-option="OtherConditions"
            >
              <FormattedMessage
                id="ailments.otherConditions"
                defaultMessage="{otherConditions}"
                values={{ otherConditions: this.messages[this.props.intl.locale]["ailments.otherConditions"] }}
              />
            </text>
            {this.state.isMobile && (
              <rect
                className="title-line"
                x={
                  this.state.isMobile
                    ? this.mobileOptions["OtherConditions"]["x"] - 68
                    : "200"
                } // Keep desktop x-position as "200"
                y={
                  this.state.isMobile
                    ? this.mobileOptions["OtherConditions"]["y"] + 7
                    : "60"
                } // Default desktop y-position
                width={this.titleLineWidths["OtherConditions"][this.props.intl.locale] || this.titleLineWidths["OtherConditions"]["en"]}
                height="3"
                fill="#E5EBED"
              />
            )}
          </g>
        </svg>
      </Container>
    );
  }
}

export default injectIntl(Body);
