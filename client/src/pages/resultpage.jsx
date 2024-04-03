import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useRef } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { registerables } from "chart.js";
import { Chart } from "chart.js";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { FileDown } from "lucide-react";
import { useRecoilValueLoadable } from "recoil";
import { userSelector } from "../store/atoms";
Chart.register(...registerables);

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
};

const ResultPage = () => {
  const pdfRef = useRef();
  const [userData, setUserData] = useState(null);
  const [riasecData, setRiasecData] = useState(null);
  const [careerData, setCareerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = useRecoilValueLoadable(userSelector);

  // only png img is allow in pdf
  function pdfDownload() {
    try {
      // const pdfDiv = document.createElement("div");
      // pdfDiv.setAttribute("ref", pdfRef);
      // pdfDiv.innerHTML = document.getElementById("main-div").innerHTML;
      // console.log(pdfDiv);
      const input = pdfRef.current;

      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        console.log(imgData);
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${userData.name}_analysis.pdf`);
      });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (user.state == "loading") {
      setUserData(null);
    } else if (user.state == "hasValue") {
      setUserData(user.contents);
    } else {
      console.log("error");
    }
  }, [user]);

  useEffect(() => {
    const getReports1 = async () => {
      setLoading(true);
      const { data } = await axios.get(`/report/getReport1`);
      if (data.message) {
        setRiasecData(data.message);
      }

      setLoading(false);
    };

    getReports1();
  }, []);

  useEffect(() => {
    const getReports2 = async () => {
      setLoading(true);
      const { data } = await axios.get(`/report/getReport2`);
      if (data.message) {
        setCareerData(data.message);
      }
      setLoading(false);
    };

    getReports2();
  }, []);

  const options2 = {
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="overflow-y-scroll">
      <div ref={pdfRef} className=" ">
        <div className="flex justify-between   border-red-600">
          <div
            className="flex flex-col items-center gap-2 border-blue-600"
            style={{
              maxWidth: "400px",
              padding: "20px",
              // width: "50%"
            }}
          >
            {riasecData ? (
              <Pie
                data={{
                  labels: [
                    "Realistic",
                    "Investigative",
                    " Artistic",
                    " Social",
                    " Enterprising",
                    "Conventional",
                  ],
                  datasets: [
                    {
                      data: Object.values(riasecData.scores).map(
                        (val) => val * 10,
                      ),
                      backgroundColor: [
                        "#D8BFD8", // Lavender
                        "#7B68EE", // MediumSlateBlue
                        "#ADD8E6", // LightBlue
                        "#98FB98", // PaleGreen
                        "#FFFFE0", // LightYellow
                        "#FFDAB9", // PeachPuff
                      ],
                    },
                  ],
                }}
                options={options}
              ></Pie>
            ) : (
              "Loading..."
            )}
            <div className=" grid grid-cols-3 gap-1">
              <div className=" center-div justify-start gap-1">
                <div className="h-5 w-5 bg-[#D8BFD8] "></div>Realistic
              </div>
              <div className="center-div justify-start  gap-1">
                <div className="h-5 w-5 bg-[#7B68EE] "></div>Investigative
              </div>
              <div className="center-div justify-start  gap-1">
                <div className="h-5 w-5 bg-[#ADD8E6] "></div> Artistic
              </div>
              <div className="center-div justify-start  gap-1">
                <div className="h-5 w-5 bg-[#98FB98] "></div>Social
              </div>
              <div className="center-div justify-start  gap-1">
                <div className="h-5 w-5 bg-[#FFFFE0] "></div>Enterprising
              </div>
              <div className="center-div justify-start  gap-1">
                <div className="h-5 w-5 bg-[#FFDAB9] "></div>Conventional
              </div>
            </div>
          </div>

          <div
            className=" relative  flex w-1/2 items-center justify-center"
            style={{}}
          >
            {careerData ? (
              <Bar
                data={{
                  labels: Object.keys(careerData.userOptions).map((label) =>
                    label.toString(),
                  ),
                  datasets: [
                    {
                      label: "Career Scope",
                      data: Object.values(careerData.userOptions).map((value) =>
                        Number(value),
                      ),
                      backgroundColor: "orange",
                    },
                  ],
                }}
                options={options2}
              />
            ) : (
              "Loading..."
            )}
            <div className="absolute right-8 top-6 z-10 ">
              <button
                onClick={pdfDownload}
                className="center-div gap-1 rounded-lg bg-primary px-2 py-1 text-sm font-semibold text-white"
              >
                <span>
                  <FileDown size={18} />
                </span>{" "}
                Download pdf
              </button>
            </div>
          </div>
        </div>

        <div className="  my-4 rounded-t-md  ">
          <p className="rounded-t-md bg-orange-400 py-2 text-center text-lg font-semibold text-white ">
            Summary
          </p>
          <div className="whitespace-pre-line p-2 text-justify">
            <h3 className="my-2 text-lg font-semibold text-gray-600">
              Personality
            </h3>
            <p className="whitespace-pre-line font-light text-gray-600 ">
              {riasecData?.content}
            </p>

            <h3 className="my-2 text-lg font-semibold text-gray-600">
              Career Options
            </h3>
            <p className="whitespace-pre-line font-light text-gray-600 ">
              {careerData?.content}
            </p>
          </div>
        </div>
        <div className="center-div w-full pb-8 pt-4">
          <button
            className="center-div gap-1 rounded-lg bg-primary px-2 py-1 text-lg font-semibold text-white"
            onClick={pdfDownload}
          >
            <span>
              <FileDown />
            </span>{" "}
            Download pdf
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;

// const ResultPage = () => {
//   return <div className="h-[97vh] border">final results</div>;
// };

// export default ResultPage;
