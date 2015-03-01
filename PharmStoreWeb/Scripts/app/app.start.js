﻿/// <reference path="../libs/angular/angular.js" />

(function () {
	'use strict';

	angular
		.module('pharmStore')
		.factory('appStart', [
			'APP_DEBUG_MODE',
			'modalsService',
			'modalViews',
			AppStartFactory]);

	function AppStartFactory(
		APP_DEBUG_MODE,
		modalsService,
		modalViews) {

		var onCloseTab,
			putTemplatesToCache,
			_start;

		// event listener of close the browser tab
		onCloseTab = function (event) {
			window.onbeforeunload = function (event) {
				var message = 'Sure you want to leave?';
				if (typeof event == 'undefined') {
					event = window.event;
				}
				if (event) {
					event.returnValue = message;
				}
				return message;
			}
		};

		putTemplatesToCache = function () {
			// push modal templates to cache
			_.each(modalViews.alerts, function (n, key) {
				modalsService.getTemplate(modalViews.alerts[key]);
			});

			_.each(modalViews.confirms, function (n, key) {
				modalsService.getTemplate(modalViews.confirms[key]);
			});
		};

		_start = function () {
			if (!APP_DEBUG_MODE) {
				onCloseTab();
			}
			putTemplatesToCache();
		};

		return {
			start: _start
		};
	}

})();