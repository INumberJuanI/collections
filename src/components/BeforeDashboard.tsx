import Link from 'next/link'
import React from 'react'

const BeforeDashboard = () => {
  return (
    <div
      className="widget"
      data-slug="beforeDashboard-0"
      data-width="full"
      style={{ width: '100%', padding: '6px', opacity: 1, position: 'relative' }}
    >
      <div
        className="droppable-widget"
        data-testid="beforeDashboard-0-before"
        style={{
          position: 'absolute',
          inset: '0px auto 0px -2px',
          borderRadius: '1000px',
          width: '4px',
          backgroundColor: 'transparent',
          marginBottom: '10px',
          marginTop: '10px',
          pointerEvents: 'none',
          zIndex: 1000,
        }}
      ></div>
      <div className="draggable" id="collections-0" style={{ width: '100%', height: '100%' }}>
        <div className="widget-wrapper ">
          <div aria-hidden="false" className="widget-content">
            <div className="collections">
              <div className="collections__wrap">
                <div className="collections__group">
                  <h2 className="collections__label">Dashboard</h2>
                  <ul className="collections__card-list">
                    <li>
                      <div className="card card-items card--has-onclick" id="card-items">
                        <h3 className="card__title">Start</h3>
                        {/* <div className="card__actions">
                          <Link
                            type="button"
                            aria-label="Create new Items"
                            className="btn btn--icon btn--icon-style-with-border btn--icon-only btn--size-medium btn--icon-position-right btn--withoutPopup btn--style-icon-label btn--round btn--withoutPopup"
                            title="Create new Items"
                            href="/"
                            target="_blank"
                          >
                            <span className="btn__content">
                              <span className="btn__icon">
                                <svg
                                  className="icon icon--plus"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  width="20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    className="stroke"
                                    d="M5.33333 9.99998H14.6667M9.99999 5.33331V14.6666"
                                    strokeLinecap="square"
                                  ></path>
                                </svg>
                              </span>
                            </span>
                          </Link>
                        </div> */}
                        <Link
                          type="button"
                          aria-label="Show all Items"
                          className="btn card__click btn--icon-style-without-border btn--size-medium btn--withoutPopup btn--style-none btn--withoutPopup"
                          title="Go to Start page"
                          href="/"
                          // target="_blank"
                        >
                          <span className="btn__content"></span>
                        </Link>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="droppable-widget"
        data-testid="beforeDashboard-0-after"
        style={{
          position: 'absolute',
          inset: '0px -2px 0px auto',
          borderRadius: '1000px',
          width: '4px',
          backgroundColor: 'transparent',
          marginBottom: '10px',
          marginTop: '10px',
          pointerEvents: 'none',
          zIndex: 1000,
        }}
      ></div>
    </div>
  )
}

export default BeforeDashboard
