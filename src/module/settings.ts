import { getGame, MODULE_ID } from "./utils/quench-utils";

import fields = foundry.data.fields;

/**
 * Registers all settings
 */
export function registerSettings(): void {
	const game = getGame();

	game.settings.register(MODULE_ID, "logTestDetails", {
		name: "QUENCH.LogTestDetailsLabel",
		hint: "QUENCH.LogTestDetailsHint",
		scope: "client",
		config: true,
		type: new fields.BooleanField({ required: true, initial: true }),
	});

	game.settings.register(MODULE_ID, "exampleTests", {
		name: "QUENCH.ExampleTestsLabel",
		hint: "QUENCH.ExampleTestsHint",
		scope: "client",
		config: true,
		type: new fields.BooleanField({ required: true, initial: false }),
		requiresReload: true,
	});

	game.settings.register(MODULE_ID, "collapseSuccessful", {
		name: "QUENCH.CollapseSuccessfulLabel",
		hint: "QUENCH.CollapseSuccessfulHint",
		scope: "client",
		config: true,
		type: new fields.BooleanField({ required: true, initial: false }),
	});

	game.settings.register(MODULE_ID, "autoShowQuenchWindow", {
		name: "QUENCH.AutoShowQuenchWindowLabel",
		hint: "QUENCH.AutoShowQuenchWindowHint",
		scope: "client",
		config: true,
		type: new fields.BooleanField({ required: true, initial: false }),
	});

	game.settings.register(MODULE_ID, "autoRun", {
		name: "QUENCH.AutoRunLabel",
		hint: "QUENCH.AutoRunHint",
		scope: "client",
		config: true,
		type: new fields.BooleanField({ required: true, initial: false }),
	});

	game.settings.register(MODULE_ID, "preselectFilters", {
		name: "QUENCH.PreselectFiltersLabel",
		hint: "QUENCH.PreselectFiltersHint",
		scope: "client",
		config: true,
		type: new fields.StringField({
			required: true,
			initial: "**",
			nullable: false,
			blank: true,
		}),
	});
}
