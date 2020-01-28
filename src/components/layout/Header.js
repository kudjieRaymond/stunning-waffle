import React , { useState } from "react";
import { FaPizzaSlice } from "react-icons/fa";

export const Header = ({ darkMode, setDarkMode }) => {
	const [shouldShowMain, setShouldShowMain] = useState(false);
	const [showQuickAddTask, setshowQuickAddTask] = useState(false);
	return (
		<header className="header" data-testid="header">
			<nav>
				<div className="logo">
					<img src="/images/logo.png" alt="" />
				</div>
				<div className="settings">
					<ul>
						<li className="settings__add" data-testid="quick-add-task-action">
							+
						</li>
						<li data-testid="dark-mode-action" className="settings__darkmode"
							onClick={()=>{setDarkMode(!darkMode);}}
						>
							<FaPizzaSlice />
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
};
