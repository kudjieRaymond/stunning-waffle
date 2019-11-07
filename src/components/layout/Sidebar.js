import React from "react";
import {
	FaChevronDown,
	FaInbox,
	FaRegCalendarAlt,
	FaRegCalendar
} from "react-icons/fa";

export const Sidebar = () => (
					<div className="sidebar" data-testid="sidebar">
						<ul className="sidebar__generic">
							<li className="inbox" data-testid="inbox">
								<span>
									<FaInbox />
								</span>
								<span>Inbox</span>
							</li>
							<li data-testid="today" className="today">
								<span>
									<FaRegCalendar />
								</span>
								<span>Today</span>
							</li>
							<li data-testid="next_7" className="next_7">
								<span>
									<FaRegCalendar />
								</span>
								<span>Next 7 Days</span>
							</li>
						</ul>
						<div className="sidebar__middle">
							<span>
								<FaChevronDown />
							</span>
							<h2>Projects</h2>
						</div>
						<ul className="sidebar_projects">Projects will be here</ul>
						App Project components here
					</div>
				);
