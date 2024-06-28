import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import './datve.css'
import ChuyenTau from './chuyen';
import apiService from './QuyTrinhDatVe/tripservice';
const DatVe = () => {
    return (
        <div>
            <div class="qodef-m-inner">
                    <div className="flex items-center justify-center bg-stone-200 h-64">
                        <div className="container mx-auto">
                            <h1 className="qodef-m-title entry-title text-xl font-bold ">
                                Đặt vé trực tuyến
                            </h1>
                        </div>
                    </div>
                <div>
                    <section className=" bg-gray-100">
                      </section>
                      <div className=''>
                        <ChuyenTau/>
</div>
{/* <SeatingChart/> */}
{/* //sectionftve */}
<div className='container mx-auto'>
          <section
          className="elementor-section elementor-top-section elementor-element elementor-element-059ba34 elementor-section-boxed elementor-section-height-default elementor-section-height-default qodef-elementor-content-no"
          data-id="059ba34"
          data-element_type="section"
        >
  <div className="elementor-container elementor-column-gap-default">
    <div
      className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-fa754fc"
      data-id="fa754fc"
      data-element_type="column"
    >
      <div className="elementor-widget-wrap elementor-element-populated">
        <div
          className="elementor-element elementor-element-5600743 elementor-widget elementor-widget-text-editor"
          data-id={5600743}
          data-element_type="widget"
          data-widget_type="text-editor.default"
        >
          <div className="elementor-widget-container">
            <style
              dangerouslySetInnerHTML={{
                __html:
                  "/*! elementor - v3.18.0 - 20-12-2023 */\n.elementor-widget-text-editor.elementor-drop-cap-view-stacked .elementor-drop-cap{background-color:#69727d;color:#fff}.elementor-widget-text-editor.elementor-drop-cap-view-framed .elementor-drop-cap{color:#69727d;border:3px solid;background-color:transparent}.elementor-widget-text-editor:not(.elementor-drop-cap-view-default) .elementor-drop-cap{margin-top:8px}.elementor-widget-text-editor:not(.elementor-drop-cap-view-default) .elementor-drop-cap-letter{width:1em;height:1em}.elementor-widget-text-editor .elementor-drop-cap{float:left;text-align:center;line-height:1;font-size:50px}.elementor-widget-text-editor .elementor-drop-cap-letter{display:inline-block}"
              }}
            />{" "}
            <p style={{ backgroundColor: "#ffffff", textAlign: "left" }}>
              <strong>
                <em>Lưu ý:&nbsp;</em>
              </strong>
              <strong>
                <em>
                  Saigon Waterbus miễn phí vé cho người cao tuổi từ 70 và các bé
                  dưới 1 tuổi, người khuyết tật và thương binh.&nbsp;
                </em>
              </strong>
            </p>
            <p>
              <strong>Lịch tàu 01</strong> Saigon Waterbus các chuyến từ bến
              Bạch Đằng đến các bến Bình An, Thanh Đa, Hiệp Bình Chánh, Linh
              Đông và ngược lại.
            </p>
            <p style={{ backgroundColor: "#ffffff" }}>
              <span style={{ fontWeight: "bold" }}>
                <img
                  fetchpriority="high"
                  decoding="async"
                  className="alignnone wp-image-10330 size-full"
                  src="https://saigonwaterbus.com/wp-content/uploads/2024/03/20240226-Lich-tau-Update-RGB.jpg"
                  alt=""
                  width={2478}
                  height={1569}
                  srcSet="https://saigonwaterbus.com/wp-content/uploads/2024/03/20240226-Lich-tau-Update-RGB.jpg 2478w, https://saigonwaterbus.com/wp-content/uploads/2024/03/20240226-Lich-tau-Update-RGB-300x190.jpg 300w, https://saigonwaterbus.com/wp-content/uploads/2024/03/20240226-Lich-tau-Update-RGB-1024x648.jpg 1024w, https://saigonwaterbus.com/wp-content/uploads/2024/03/20240226-Lich-tau-Update-RGB-768x486.jpg 768w, https://saigonwaterbus.com/wp-content/uploads/2024/03/20240226-Lich-tau-Update-RGB-1536x973.jpg 1536w, https://saigonwaterbus.com/wp-content/uploads/2024/03/20240226-Lich-tau-Update-RGB-2048x1297.jpg 2048w"
                  sizes="(max-width: 2478px) 100vw, 2478px"
                />
              </span>
            </p>
            <p style={{ backgroundColor: "#ffffff" }}>
              <span style={{ fontWeight: "bold" }}>Lịch tàu 02 </span>Khởi hành
              từ Bạch Đằng đến Thủ Thiêm và ngược lại.&nbsp;
            </p>
            <p>
              <img
                decoding="async"
                className="alignnone wp-image-10331 size-full"
                src="https://saigonwaterbus.com/wp-content/uploads/2024/03/Lich-thu-thiem.jpg"
                alt=""
                width={2477}
                height={1567}
                srcSet="https://saigonwaterbus.com/wp-content/uploads/2024/03/Lich-thu-thiem.jpg 2477w, https://saigonwaterbus.com/wp-content/uploads/2024/03/Lich-thu-thiem-300x190.jpg 300w, https://saigonwaterbus.com/wp-content/uploads/2024/03/Lich-thu-thiem-1024x648.jpg 1024w, https://saigonwaterbus.com/wp-content/uploads/2024/03/Lich-thu-thiem-768x486.jpg 768w, https://saigonwaterbus.com/wp-content/uploads/2024/03/Lich-thu-thiem-1536x972.jpg 1536w, https://saigonwaterbus.com/wp-content/uploads/2024/03/Lich-thu-thiem-2048x1296.jpg 2048w"
                sizes="(max-width: 2477px) 100vw, 2477px"
              />
            </p>
            <p style={{ backgroundColor: "#ffffff" }}>
              <span style={{ fontWeight: "bold" }}>
                Hướng dẫn đặt vé trực tuyến
                <br />
                Bước 1:{" "}
              </span>
              Tham khảo lịch khởi hành Saigon Waterbus
              <br />
              <b>Step 1</b>: Check out the departure timetable of Saigon
              Waterbus
            </p>
            <p style={{ backgroundColor: "#ffffff" }}>
              <b>Bước 2:</b>&nbsp;Chọn bến đi – bến đến, chọn ngày khởi hành sau
              đó chọn&nbsp;<span style={{ fontWeight: "bold" }}>tìm vé.</span>
              <br />
              <span
                style={{
                  fontWeight: "bold",
                  color: "var( --e-global-color-text )",
                  fontFamily:
                    "var( --e-global-typography-text-font-family ), Sans-serif"
                }}
              >
                Lưu ý:
              </span>
              <span
                style={{
                  color: "var( --e-global-color-text )",
                  fontFamily:
                    "var( --e-global-typography-text-font-family ), Sans-serif",
                  fontWeight: "var( --e-global-typography-text-font-weight )"
                }}
              >
                &nbsp;
                <br />
              </span>
              <span
                style={{
                  color: "var( --e-global-color-text )",
                  fontFamily:
                    "var( --e-global-typography-text-font-family ), Sans-serif",
                  fontWeight: "var( --e-global-typography-text-font-weight )"
                }}
              >
                Vé Saigon Waterbus là vé 1 chiều, Quý khách đặt vé đi sau đó đặt
                vé về.&nbsp;
                <br />
              </span>
              <span
                style={{
                  color: "var( --e-global-color-text )",
                  fontFamily:
                    "var( --e-global-typography-text-font-family ), Sans-serif"
                }}
              >
                <span
                  style={{
                    fontWeight: "var( --e-global-typography-text-font-weight )"
                  }}
                >
                  Thời gian đến di chuyển qua các bến như trên lịch khởi
                  hành.&nbsp;
                </span>
                <br />
              </span>
              <span
                style={{
                  color: "var( --e-global-color-text )",
                  fontFamily:
                    "var( --e-global-typography-text-font-family ), Sans-serif"
                }}
              >
                <span style={{ fontWeight: "bold" }}>
                  Ví dụ:
                  <br />
                </span>
              </span>
              <span
                style={{
                  color: "var( --e-global-color-text )",
                  fontFamily:
                    "var( --e-global-typography-text-font-family ), Sans-serif",
                  fontWeight: "var( --e-global-typography-text-font-weight )"
                }}
              >
                Từ Bạch Đằng – Bình An: 15 phút/ chiều.
                <br />
              </span>
              <span
                style={{
                  color: "var( --e-global-color-text )",
                  fontFamily:
                    "var( --e-global-typography-text-font-family ), Sans-serif",
                  fontWeight: "var( --e-global-typography-text-font-weight )"
                }}
              >
                Từ Bạch Đằng – Thanh Đa: 32 phút/ chiều.
                <br />
              </span>
              <span
                style={{
                  color: "var( --e-global-color-text )",
                  fontFamily:
                    "var( --e-global-typography-text-font-family ), Sans-serif",
                  fontWeight: "var( --e-global-typography-text-font-weight )"
                }}
              >
                Từ Bạch Đằng – Hiệp Bình Chánh: 42 phút/ chiều.&nbsp;
                <br />
              </span>
              <span
                style={{
                  color: "var( --e-global-color-text )",
                  fontFamily:
                    "var( --e-global-typography-text-font-family ), Sans-serif",
                  fontWeight: "var( --e-global-typography-text-font-weight )"
                }}
              >
                Từ Bạch Đằng – Linh Đông: 52 phút/ chiều.
              </span>
            </p>
            <p style={{ backgroundColor: "#ffffff" }}>
              <span style={{ fontWeight: "bold" }}>Step 2:</span>&nbsp;Select
              departure – arrival station, select departure date and then choose
              to search for tickets.&nbsp;
              <br />
              <span
                style={{
                  fontWeight: "bold",
                  color: "var( --e-global-color-text )",
                  fontFamily:
                    "var( --e-global-typography-text-font-family ), Sans-serif"
                }}
              >
                Note:
              </span>
              <span
                style={{
                  color: "var( --e-global-color-text )",
                  fontFamily:
                    "var( --e-global-typography-text-font-family ), Sans-serif",
                  fontWeight: "var( --e-global-typography-text-font-weight )"
                }}
              >
                &nbsp;Saigon Waterbus ticket is a one-way ticket, you book a
                ticket to go and then book a return ticket.&nbsp;
                <br />
              </span>
              <span
                style={{
                  color: "var( --e-global-color-text )",
                  fontFamily:
                    "var( --e-global-typography-text-font-family ), Sans-serif"
                }}
              >
                <span
                  style={{
                    fontWeight: "var( --e-global-typography-text-font-weight )"
                  }}
                >
                  The arrival time moves through the station as on the departure
                  schedule.
                </span>
                <br />
              </span>
              <span
                style={{
                  color: "var( --e-global-color-text )",
                  fontFamily:
                    "var( --e-global-typography-text-font-family ), Sans-serif"
                }}
              >
                <span style={{ fontWeight: "bold" }}>
                  Example:&nbsp;
                  <br />
                </span>
              </span>
              <span
                style={{
                  color: "var( --e-global-color-text )",
                  fontFamily:
                    "var( --e-global-typography-text-font-family ), Sans-serif",
                  fontWeight: "var( --e-global-typography-text-font-weight )"
                }}
              >
                From Bach Dang – Binh An: 15 minutes/way.&nbsp;
                <br />
              </span>
              <span
                style={{
                  color: "var( --e-global-color-text )",
                  fontFamily:
                    "var( --e-global-typography-text-font-family ), Sans-serif",
                  fontWeight: "var( --e-global-typography-text-font-weight )"
                }}
              >
                From Bach Dang – Thanh Da: 32 minutes/way.&nbsp;
                <br />
              </span>
              <span
                style={{
                  color: "var( --e-global-color-text )",
                  fontFamily:
                    "var( --e-global-typography-text-font-family ), Sans-serif",
                  fontWeight: "var( --e-global-typography-text-font-weight )"
                }}
              >
                From Bach Dang – Hiep Binh Chanh: 42 minutes/way.&nbsp;
                <br />
              </span>
              <span
                style={{
                  fontFamily:
                    "var( --e-global-typography-text-font-family ), Sans-serif",
                  color: "var( --e-global-color-text )"
                }}
              >
                From Bach Dang – Linh Dong: 52 minutes/way.&nbsp;
              </span>
            </p>
            <p style={{ backgroundColor: "#ffffff" }}>
              <span
                style={{
                  fontWeight: "bold",
                  fontFamily:
                    "var( --e-global-typography-text-font-family ), Sans-serif"
                }}
              >
                Bước 3:&nbsp;
              </span>
              <span
                style={{
                  fontFamily:
                    "var( --e-global-typography-text-font-family ), Sans-serif",
                  fontWeight: "var( --e-global-typography-text-font-weight )"
                }}
              >
                Chọn vị trí ghế ngồi phù hợp, số lượng ghế ngồi là số lượng vé
                bạn muốn đặt.&nbsp;
                <br />
              </span>
              <span
                style={{
                  color: "var( --e-global-color-text )",
                  fontFamily:
                    "var( --e-global-typography-text-font-family ), Sans-serif",
                  fontWeight: "var( --e-global-typography-text-font-weight )"
                }}
              >
                <span style={{ fontWeight: "bold" }}>Step 3:</span>
              </span>
              <span
                style={{
                  color: "var( --e-global-color-text )",
                  fontFamily:
                    "var( --e-global-typography-text-font-family ), Sans-serif",
                  fontWeight: "var( --e-global-typography-text-font-weight )"
                }}
              >
                <span
                  style={{
                    fontWeight: "var( --e-global-typography-text-font-weight )"
                  }}
                >
                  &nbsp;Choose your seats position, the number of seats is the
                  number of tickets you want to book.
                </span>
              </span>
            </p>
            <p style={{ backgroundColor: "#ffffff" }}>
              <span
                style={{
                  fontFamily:
                    "var( --e-global-typography-text-font-family ), Sans-serif"
                }}
              >
                <span style={{ fontWeight: "bold" }}>Bước 4:</span>
              </span>
              <span
                style={{
                  fontFamily:
                    "var( --e-global-typography-text-font-family ), Sans-serif"
                }}
              >
                <span
                  style={{
                    fontWeight: "var( --e-global-typography-text-font-weight )"
                  }}
                >
                  &nbsp;Điền thông tin liên lạc và tiến hành thanh toán.
                </span>
                <br />
                <span style={{ fontWeight: "bold" }}>Step 4:</span>
              </span>
              <span
                style={{
                  fontFamily:
                    "var( --e-global-typography-text-font-family ), Sans-serif",
                  fontWeight: "var( --e-global-typography-text-font-weight )"
                }}
              >
                &nbsp;
              </span>
              Fill in contact information and payment.&nbsp;
            </p>
            <p>
              <em>
                <strong>Lưu ý: </strong>Vé Saigon Waterbus không hoàn, không hủy
                vì vậy Quý khách vui lòng kiểm tra kỹ thông tin trước khi đặt
                vé, thanh toán.&nbsp;
              </em>
            </p>
            <p>
              <em>
                Note: Saigon Waterbus’s tickets are non-refundable,
                non-cancellable, so please check the information carefully
                before booking and making payment.
              </em>
            </p>{" "}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

</div>



                </div>

            </div>           
        </div>
    );
};

export default DatVe;