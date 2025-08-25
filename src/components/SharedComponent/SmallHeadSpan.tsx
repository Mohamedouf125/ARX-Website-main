import React from "react";

// pass color is optional
interface SmallHeadSpanProps {
  children: React.ReactNode;
  color?: string;
}

const SmallHeadSpan = ({ children, color }: SmallHeadSpanProps) => {
  return (
    <div
      className="mb-5"
      data-id="3137479"
      data-element_type="widget"
      data-settings='{"_animation":"opal-helix"}'
      data-widget_type="spaciaz-slide-scrolling.default"
      style={{
        width: "130px",
        maxWidth: "130px",
        zIndex: "2",
      }}
    >
      <div
        className="elementor-widget-container"
        style={{
          padding: "5px 20px 5px 20px",
          borderStyle: "solid",
          borderWidth: "1px 1px 1px 1px",
          borderColor: "#dba426",
          borderRadius: "20px 20px 20px 20px",
        }}
      >
        <div
          className="elementor-scrolling"
          style={{
            overflow: "hidden",
            maxWidth: "1320px",
            margin: "0 auto",
          }}
        >
          <div
            className="elementor-scrolling-wrapper"
            style={{
              whiteSpace: "nowrap",
              display: "inline-flex",
            }}
          >
            <div
              className="elementor-scrolling-inner animate-infinite-scroll"
              style={{
                animationDuration: "10s",
                alignItems: "center",
              }}
            >
              <div
                className="elementor-scrolling-item"
                style={{
                  paddingLeft: "calc(10px / 2)",
                  paddingRight: "calc(10px / 2)",
                }}
              >
                <div
                  className="elementor-scrolling-item-inner"
                  style={{
                    alignItems: "center",
                  }}
                >
                  <div
                    className="scrolling-title elementor-repeater-item-9ceca7b"
                    style={{
                      display: "block",
                    }}
                  >
                    <a
                      title="·"
                      style={{
                        textDecoration: "none",
                        whiteSpace: "nowrap",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                      }}
                    >
                      {[
                        {
                          id: 1,
                          title: "·",
                        },
                        {
                          id: 2,
                          title: children,
                        },
                        {
                          id: 3,
                          title: "·",
                        },
                        {
                          id: 4,
                          title: children,
                        },
                        {
                          id: 5,
                          title: "·",
                        },
                        {
                          id: 6,
                          title: children,
                        },
                        {
                          id: 7,
                          title: "·",
                        },
                        {
                          id: 8,
                          title: children,
                        },
                        {
                          id: 9,
                          title: "·",
                        },
                        {
                          id: 10,
                          title: children,
                        },
                      ].map((item) => (
                        <span
                          key={item.id}
                          className={`text-[14px] text-[${color}] font-[700] uppercase tracking-wider`}
                        >
                          {item.title}
                        </span>
                      ))}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallHeadSpan;
