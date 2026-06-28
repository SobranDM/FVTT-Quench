/**
 * Minimal Foundry VTT v14 ambient types for Quench development.
 * Replace fvtt-types; expand only as needed for Quench source files.
 */

declare const game: foundry.Game;
declare const ui: ui;
declare const Hooks: Hooks;

declare namespace foundry {
	class Game {
		ready: boolean;
		system?: { id: string };
		modules?: Map<string, unknown>;
		settings: ClientSettings;
		i18n?: Localization;
		userId?: string;
	}

	interface Localization {
		format(key: string, data?: Record<string, unknown>): string;
	}

	interface ClientSettings {
		register(namespace: string, key: string, data: SettingRegistration): void;
		get(namespace: string, key: string): unknown;
		sheet: applications.settings.SettingsConfig;
	}

	interface SettingRegistration {
		name: string;
		hint?: string;
		scope: string;
		config?: boolean;
		type: unknown;
		requiresReload?: boolean;
	}

	namespace utils {
		class Collection<T = unknown> {
			constructor(entries?: Iterable<[string, T]>);
			size: number;
			has(key: string): boolean;
			get(key: string): T | undefined;
			set(key: string, value: T): this;
			filter(fn: (value: T) => boolean): T[];
			map<U>(fn: (value: T) => U): U[];
			keys(): IterableIterator<string>;
		}
	}

	namespace documents {
		class Actor {
			static TYPES: string[];
			static implementation: new (data: {
				name: string;
				type: string;
			}) => InstanceType<typeof Actor.implementation>;
		}
		class User {
			static metadata: { name: string };
		}
		namespace abstract {
			class DocumentCollection<T = unknown> {
				documentName: string;
				size: number;
				documentClass: {
					deleteDocuments(ids: string[]): Promise<unknown>;
				};
				map<U>(fn: (doc: T & { id: string }) => U): U[];
			}
		}
	}

	namespace data {
		namespace fields {
			class BooleanField<T = unknown> {
				constructor(options: T);
			}
			class StringField<T = unknown> {
				constructor(options: T);
			}
		}
	}

	namespace applications {
		namespace apps {
			class FilePicker {
				static browse(source: string, target: string): Promise<{ files?: string[] } | undefined>;
				static createDirectory(source: string, path: string): Promise<boolean>;
				static upload(
					source: string,
					path: string,
					file: File,
					options?: Record<string, unknown>,
					notify?: { notify?: boolean },
				): Promise<{ status: string | number } | null>;
			}
		}

		namespace settings {
			class SettingsConfig {
				render(options?: ApplicationRenderOptions | boolean): Promise<this>;
				changeTab(tab: string, group: string, options?: { force?: boolean }): void;
			}
		}

		namespace sidebar {
			class Sidebar {}
		}

		namespace api {
			class ApplicationV2<TContext extends Record<string, unknown> = Record<string, unknown>> {
				static DEFAULT_OPTIONS: Record<string, unknown>;
				static PARTS: Record<string, unknown>;
				element: HTMLElement;
				rendered: boolean;
				constructor(options?: Partial<ApplicationV2.Configuration>);
				render(options?: ApplicationRenderOptions | boolean): Promise<this>;
				protected _prepareContext(
					options: ApplicationV2.RenderOptions,
				): Promise<TContext> | TContext;
				protected _onRender(
					context: TContext,
					options: ApplicationV2.RenderOptions,
				): Promise<void> | void;
			}

			namespace ApplicationV2 {
				type Configuration = Record<string, unknown>;
				interface RenderOptions {
					force?: boolean;
					isFirstRender?: boolean;
				}
			}

			function HandlebarsApplicationMixin<
				TBase extends abstract new (
					...args: never[]
				) => ApplicationV2<Record<string, unknown>>,
			>(
				Base: TBase,
			): TBase & {
				new (
					...args: ConstructorParameters<TBase>
				): InstanceType<TBase> & {
					element: HTMLElement;
					rendered: boolean;
					render(options?: ApplicationRenderOptions | boolean): Promise<InstanceType<TBase>>;
				};
			};
		}

		namespace ux {
			class SearchFilter {
				constructor(options: {
					inputSelector: string;
					contentSelector: string;
					callback: (event: Event, query: string, rgx: RegExp, html: HTMLElement | null) => void;
				});
				bind(element: HTMLElement): void;
				static cleanQuery(text: string): string;
			}
		}
	}
}

interface ApplicationRenderOptions {
	force?: boolean;
	focus?: boolean;
	isFirstRender?: boolean;
}

interface ui {
	notifications?: {
		error(message: string): void;
		warn(message: string): void;
		info(message: string, options?: { localize?: boolean }): void;
	};
}

interface Hooks {
	on(hook: string, fn: (...args: never[]) => unknown): void;
	callAll(hook: string, ...args: unknown[]): void;
}

declare namespace Hooks {
	interface StaticCallbacks {
		init: () => void;
		setup: () => void;
		ready: () => void;
		renderSidebar: (
			sidebar: foundry.applications.sidebar.Sidebar,
			element: HTMLElement,
			context: Record<string, unknown>,
			options: { isFirstRender?: boolean },
		) => void;
	}
}

declare namespace Chai {
	interface AssertionError {
		snapshotError?: boolean;
		showDiff?: boolean;
		expected?: unknown;
		actual?: unknown;
	}

	interface Should {
		equal(value: unknown): void;
		not: {
			equal(...values: unknown[]): void;
		};
		have: {
			property(name: string, value?: unknown): void;
		};
		matchSnapshot(): void;
		eventually: {
			equal(value: unknown): void;
			have: { property(name: string): void };
		};
		be: {
			rejectedWith(type: unknown): void;
		};
	}
}

interface Object {
	should: Chai.Should;
}

interface String {
	slugify(options?: { strict?: boolean; replace?: RegExp; replacement?: string }): string;
	should: Chai.Should;
}

interface ImportMetaEnv {
	readonly DEV: boolean;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
