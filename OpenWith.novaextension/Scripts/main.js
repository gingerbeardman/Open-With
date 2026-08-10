const IDENTIFIER = "com.gingerbeardman.OpenWith";
const APPS_KEY = `${IDENTIFIER}.apps`;
const LAST_APP_KEY = `${IDENTIFIER}.lastApp`;

exports.activate = function () {
	// No startup work required
};

exports.deactivate = function () {
	// No cleanup required
};

function getConfiguredApps() {
	const apps = nova.config.get(APPS_KEY, "array") || [];
	return apps
		.map((app) => (typeof app === "string" ? app.trim() : ""))
		.filter((app) => app.length > 0);
}

function appDisplayName(appPath) {
	const base = nova.path.basename(appPath);
	return base.replace(/\.app$/i, "");
}

function openExtensionSettings() {
	nova.openConfig(IDENTIFIER);
}

function promptToConfigureApps() {
	nova.workspace.showActionPanel(
		"No apps are configured yet.\n\nAdd one or more apps in the extension settings (for example GrandPerspective), then try again.",
		{
			buttons: ["Open Settings", "Cancel"],
		},
		(buttonIndex) => {
			if (buttonIndex === 0) {
				openExtensionSettings();
			}
		}
	);
}

function chooseApp(callback) {
	const apps = getConfiguredApps();

	if (apps.length === 0) {
		promptToConfigureApps();
		return;
	}

	if (apps.length === 1) {
		callback(apps[0]);
		return;
	}

	const lastApp = nova.config.get(LAST_APP_KEY, "string");
	let ordered = apps.slice();
	if (lastApp && apps.includes(lastApp)) {
		ordered = [lastApp].concat(apps.filter((app) => app !== lastApp));
	}

	const names = ordered.map(appDisplayName);
	nova.workspace.showChoicePalette(
		names,
		{ placeholder: "Open With…" },
		(choice, index) => {
			if (choice === null || choice === undefined || index === undefined) {
				return;
			}
			callback(ordered[index]);
		}
	);
}

function openPathWithApp(appPath, targetPath) {
	const process = new Process("/usr/bin/open", {
		args: ["-a", appPath, targetPath],
	});

	const lines = [];

	process.onStderr(function (data) {
		if (data) {
			lines.push(data);
		}
	});

	process.onDidExit(function (status) {
		if (status != 0) {
			nova.workspace.showErrorMessage(
				nova.localize("Error opening with app:") +
					"\n\n" +
					(lines.join("") || `open exited with status ${status}`)
			);
			return;
		}

		nova.config.set(LAST_APP_KEY, appPath);
	});

	process.start();
}

function openWorkspaceWithApp(preferredApp) {
	if (!nova.workspace.path) {
		nova.workspace.showInformativeMessage(
			nova.localize("This workspace has no path.")
		);
		return;
	}

	if (preferredApp) {
		openPathWithApp(preferredApp, nova.workspace.path);
		return;
	}

	chooseApp((appPath) => {
		openPathWithApp(appPath, nova.workspace.path);
	});
}

function openFileWithApp() {
	const editor = nova.workspace.activeTextEditor;
	if (!editor || !editor.document || !editor.document.path) {
		nova.workspace.showInformativeMessage(
			nova.localize("No file is currently open.")
		);
		return;
	}

	chooseApp((appPath) => {
		openPathWithApp(appPath, editor.document.path);
	});
}

function openWorkspaceWithDefaultApp() {
	const apps = getConfiguredApps();
	if (apps.length === 0) {
		promptToConfigureApps();
		return;
	}

	// First entry in the configured list is the default
	openWorkspaceWithApp(apps[0]);
}

nova.commands.register(`${IDENTIFIER}.openWorkspace`, function () {
	openWorkspaceWithApp();
});

nova.commands.register(`${IDENTIFIER}.openFile`, function () {
	openFileWithApp();
});

nova.commands.register(`${IDENTIFIER}.openWorkspaceDefault`, function () {
	openWorkspaceWithDefaultApp();
});

nova.commands.register(`${IDENTIFIER}.configure`, function () {
	openExtensionSettings();
});
