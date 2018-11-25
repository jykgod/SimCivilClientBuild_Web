window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  ComponentUINameEnum: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "332f06PDuVG26fK59TkzYJh", "ComponentUINameEnum");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ComponentUINameEnum;
    (function(ComponentUINameEnum) {
      ComponentUINameEnum["DEFAULT"] = "null";
    })(ComponentUINameEnum = exports.ComponentUINameEnum || (exports.ComponentUINameEnum = {}));
    cc._RF.pop();
  }, {} ],
  DirectionComponent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f778co7FtJBeqazeMWh3kpa", "DirectionComponent");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var DirectionComponent = function() {
      function DirectionComponent() {
        this.direction = cc.Vec2.ZERO;
      }
      return DirectionComponent;
    }();
    exports.default = DirectionComponent;
    cc._RF.pop();
  }, {} ],
  EcsUtility: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "636d21fNKdHlq7iso7mbvFV", "EcsUtility");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EcsUtility = function() {
      function EcsUtility() {}
      EcsUtility.GotRole = false;
      return EcsUtility;
    }();
    exports.EcsUtility = EcsUtility;
    cc._RF.pop();
  }, {} ],
  EditableComponentContainerConfigure: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b6c12wK4RdBho+MBlw+ti3X", "EditableComponentContainerConfigure");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EditableComponentContainerConfigure = function(_super) {
      __extends(EditableComponentContainerConfigure, _super);
      function EditableComponentContainerConfigure() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      return EditableComponentContainerConfigure;
    }(LocalStorageBase);
    exports.EditableComponentContainerConfigure = EditableComponentContainerConfigure;
    cc._RF.pop();
  }, {} ],
  EditableComponentContainer: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6351fzF651AKa2GbH5Wc4/J", "EditableComponentContainer");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EditableComponentContainerConfigure_1 = require("./EditableComponentContainerConfigure");
    var ComponentUINameEnum_1 = require("../../enum/ComponentUINameEnum");
    var UIBase_1 = require("../UIBase");
    var LocalStorageEnum_1 = require("../../enum/LocalStorageEnum");
    var EditableComponentUIManager_1 = require("../../manager/EditableComponentUIManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, requireComponent = _a.requireComponent, disallowMultiple = _a.disallowMultiple;
    var EditableComponentUIContainer = function(_super) {
      __extends(EditableComponentUIContainer, _super);
      function EditableComponentUIContainer() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.editableComponentUIArr = [];
        _this.subUIArr = [];
        return _this;
      }
      EditableComponentUIContainer.prototype.start = function() {
        var _this = this;
        Logger.log("start", "EditableComponentUIContainer");
        this.release();
        this.subUIArr = [];
        var baseUI = this.node.getComponent(UIBase_1.default);
        this.conf = LocalStorageUtils.loadStorageObject(LocalStorageEnum_1.LocalStorageEnum.EDITABLE_CONTAINER_PREFIX.concat(this.node.name));
        if (null == this.conf) {
          this.conf = new EditableComponentContainerConfigure_1.EditableComponentContainerConfigure(LocalStorageEnum_1.LocalStorageEnum.EDITABLE_CONTAINER_PREFIX.concat(this.node.name));
          this.conf.keys = [];
          Logger.log(this.node.name + " \u672c\u5730\u914d\u7f6e\u8bfb\u53d6\u5931\u8d25\uff0c\u7528prefab\u4e0a\u7684\u914d\u7f6e\u521b\u5efa\u5b50UI", "EditableComponentUIContainer");
          for (var i = 0; i < this.editableComponentUIArr.length; i++) EditableComponentUIManager_1.EditableComponentUIManager.Instance.CreateEditableComponentUI(this.node.name, this.editableComponentUIArr[i].fatherNode, this.editableComponentUIArr[i].name, function(ui) {
            _this.subUIArr.push(ui);
            _this.conf.keys.push(ui.Key);
            _this.conf.keys.length == _this.editableComponentUIArr.length && _this.conf.Save();
          });
        } else {
          Logger.log(this.node.name + " \u4f7f\u7528\u672c\u5730\u914d\u7f6e\u521b\u5efa\u5b50UI", "EditableComponentUIContainer");
          Logger.info(this.conf);
          for (var i = 0; i < this.conf.keys.length; i++) EditableComponentUIManager_1.EditableComponentUIManager.Instance.LoadEditableComponentUI(this.conf.keys[i], function(ui) {
            _this.subUIArr.push(ui);
          });
        }
      };
      EditableComponentUIContainer.prototype.addSubUI = function(ui) {
        if (null != this.conf && void 0 != this.conf) {
          this.subUIArr.push(ui);
          this.conf.keys.push(ui.Key);
          this.conf.Save();
        }
      };
      EditableComponentUIContainer.prototype.release = function() {
        if (null != this.subUIArr) for (var i = 0; i < this.subUIArr.length; i++) this.subUIArr[i].node.destroy();
      };
      EditableComponentUIContainer.prototype.onDestroy = function() {
        this.release();
      };
      __decorate([ property([ cc.Class({
        name: "ComponentUIStruct",
        properties: {
          name: {
            default: ComponentUINameEnum_1.ComponentUINameEnum.DEFAULT,
            tooltip: "\u53ef\u7f16\u8f91\u7ec4\u4ef6UI\u7684\u540d\u5b57\uff08\u4eceComponentUINameEnum\u91cc\u9762\u53d6\uff09"
          },
          fatherNode: {
            type: cc.Node,
            default: null,
            tooltip: "\u53ef\u7f16\u8f91\u7ec4\u4ef6UI\u9700\u8981\u6302\u8f7d\u7684\u8282\u70b9"
          }
        }
      }) ]) ], EditableComponentUIContainer.prototype, "editableComponentUIArr", void 0);
      EditableComponentUIContainer = __decorate([ ccclass, disallowMultiple, requireComponent(UIBase_1.default) ], EditableComponentUIContainer);
      return EditableComponentUIContainer;
    }(cc.Component);
    exports.EditableComponentUIContainer = EditableComponentUIContainer;
    cc._RF.pop();
  }, {
    "../../enum/ComponentUINameEnum": "ComponentUINameEnum",
    "../../enum/LocalStorageEnum": "LocalStorageEnum",
    "../../manager/EditableComponentUIManager": "EditableComponentUIManager",
    "../UIBase": "UIBase",
    "./EditableComponentContainerConfigure": "EditableComponentContainerConfigure"
  } ],
  EditableComponentUIConfigure: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "589daM8EFRMf7RBbyU0L0ec", "EditableComponentUIConfigure");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EditableComponentUIConfigure = function(_super) {
      __extends(EditableComponentUIConfigure, _super);
      function EditableComponentUIConfigure() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      EditableComponentUIConfigure.prototype.clone = function(key) {
        var ret = new EditableComponentUIConfigure(key);
        ret.uiname = this.uiname;
        ret.pos = this.pos;
        ret.scale = this.scale;
        ret.fatherUI = this.fatherUI;
        ret.parentNodePath = this.parentNodePath;
        ret.data = this.data;
        return ret;
      };
      return EditableComponentUIConfigure;
    }(LocalStorageBase);
    exports.EditableComponentUIConfigure = EditableComponentUIConfigure;
    cc._RF.pop();
  }, {} ],
  EditableComponentUIManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "60b19feBENPIpkRA31jhPVx", "EditableComponentUIManager");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EditableComponentUI_1 = require("../ui/editableui/EditableComponentUI");
    var EditableComponentUIConfigure_1 = require("../ui/editableui/EditableComponentUIConfigure");
    var GloableConstantUtils_1 = require("../tools/GloableConstantUtils");
    var LocalStorageEnum_1 = require("../enum/LocalStorageEnum");
    var UIManager_1 = require("./UIManager");
    var GloableUtils_1 = require("../tools/GloableUtils");
    var EditableComponentUIManager = function() {
      function EditableComponentUIManager() {}
      EditableComponentUIManager.prototype.LoadEditableComponentUI = function(key, callback) {
        var conf = LocalStorageUtils.loadStorageObject(key);
        Logger.info(conf);
        cc.loader.loadRes(GloableConstantUtils_1.GloableConstantUtils.UIPrefabPath.concat(conf.uiname.toString()), function(error, res) {
          if (null != error) {
            Logger.error("load res error key:" + key, "EditableComponent");
            null != callback && callback(null);
            return;
          }
          var node = cc.instantiate(res);
          var ui = node.getComponent(EditableComponentUI_1.EditableComponentUI);
          ui.Conf = conf;
          if (true == ui.resetUIStateByConfig()) {
            ui.show(conf.data);
            callback(ui);
          } else {
            ui.node.destroy();
            null != callback && callback(null);
          }
        });
      };
      EditableComponentUIManager.prototype.CreateEditableComponentUI = function(fatherUI, fatherNode, componentName, callback) {
        var fUI = UIManager_1.UIManager.Instance.GetUI(fatherUI);
        if (null == fUI || void 0 == fUI) {
          Logger.log("\u7236UI\u4e3a\u7a7a", "CreateEditableComponentUI " + fatherUI + " " + fatherNode + " " + componentName);
          null != callback && callback(null);
          return;
        }
        var path = GloableUtils_1.GloableUtils.GetNodePath(fUI.node, fatherNode);
        if (null == path) {
          Logger.log("\u627e\u4e0d\u5230\u7236\u8282\u70b9", "CreateEditableComponentUI");
          null != callback && callback(null);
          return;
        }
        cc.loader.loadRes(GloableConstantUtils_1.GloableConstantUtils.UIPrefabPath.concat(componentName.toString()), function(error, res) {
          if (null != error) {
            Logger.error("load res error key:" + componentName, "EditableComponent");
            null != callback && callback(null);
            return;
          }
          var node = cc.instantiate(res);
          var ui = node.getComponent(EditableComponentUI_1.EditableComponentUI);
          node.parent = fatherNode;
          var editableCount = LocalStorageUtils.getNumber(LocalStorageEnum_1.LocalStorageEnum.EDITABLE_UI_COUNT) + 1;
          LocalStorageUtils.setNumber(LocalStorageEnum_1.LocalStorageEnum.EDITABLE_UI_COUNT, editableCount);
          var conf = new EditableComponentUIConfigure_1.EditableComponentUIConfigure(LocalStorageEnum_1.LocalStorageEnum.EDITABLE_UI_PREFIX.concat(editableCount.toString()));
          conf.fatherUI = fatherUI;
          conf.parentNodePath = path;
          conf.pos = node.position;
          conf.scale = node.scale;
          conf.uiname = componentName;
          conf.Save();
          ui.Conf = conf;
          ui.show(null);
          null != callback && callback(ui);
        });
      };
      EditableComponentUIManager.Instance = new EditableComponentUIManager();
      return EditableComponentUIManager;
    }();
    exports.EditableComponentUIManager = EditableComponentUIManager;
    cc._RF.pop();
  }, {
    "../enum/LocalStorageEnum": "LocalStorageEnum",
    "../tools/GloableConstantUtils": "GloableConstantUtils",
    "../tools/GloableUtils": "GloableUtils",
    "../ui/editableui/EditableComponentUI": "EditableComponentUI",
    "../ui/editableui/EditableComponentUIConfigure": "EditableComponentUIConfigure",
    "./UIManager": "UIManager"
  } ],
  EditableComponentUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c1d72LimzlFrqEaNAIwlTzE", "EditableComponentUI");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GloableUtils_1 = require("../../tools/GloableUtils");
    var UINameEnum_1 = require("../../enum/UINameEnum");
    var EditableComponentUIConfigure_1 = require("./EditableComponentUIConfigure");
    var LocalStorageEnum_1 = require("../../enum/LocalStorageEnum");
    var UIManager_1 = require("../../manager/UIManager");
    var EditableComponentUIManager_1 = require("../../manager/EditableComponentUIManager");
    var GloableConstantUtils_1 = require("../../tools/GloableConstantUtils");
    var EditableComponentContainer_1 = require("./EditableComponentContainer");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var EditableComponentUI = function(_super) {
      __extends(EditableComponentUI, _super);
      function EditableComponentUI() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.pressEnterEditModeDeltaTime = 1;
        return _this;
      }
      Object.defineProperty(EditableComponentUI.prototype, "Key", {
        get: function() {
          if (null == this.conf) return null;
          return this.conf.Key();
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(EditableComponentUI.prototype, "Editing", {
        get: function() {
          return this.editing;
        },
        enumerable: true,
        configurable: true
      });
      EditableComponentUI.prototype.onLoad = function() {
        var _this = this;
        Logger.log("onload", "EditableComponentUI");
        this.clickTimes = 0;
        this.onPressing = false;
        this.editing = false;
        this.lastOnPressTimes = 0;
        var bound = this.node.getBoundingBoxToWorld();
        this.node.width = bound.width;
        this.node.height = bound.height;
        this.node.on(cc.Node.EventType.TOUCH_START, function(event) {
          _this.onPressEditCallBack(event);
        });
        this.node.on(cc.Node.EventType.TOUCH_END, function(event) {
          _this.onReleaseEditCallBack(event);
        });
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function(event) {
          _this.onMoveEditCallBack(event);
        });
      };
      EditableComponentUI.prototype.onPressEditCallBack = function(event) {
        false == this.editing ? this.onPressNotEditing(event) : this.onPressEditing(event);
        this.lastOnPressTimes = TimeManager.Instance.realTimeSinceStartScene;
        this.onPressing = true;
      };
      EditableComponentUI.prototype.onMoveEditCallBack = function(event) {
        false == this.editing ? this.onMoveNotEditing(event) : this.onMoveEditing(event);
      };
      EditableComponentUI.prototype.onReleaseEditCallBack = function(event) {
        false == this.editing ? this.onReleaseNotEditing(event) : this.onReleaseEditing(event);
        this.onPressing = false;
      };
      EditableComponentUI.prototype.onPressEditing = function(event) {
        Logger.log("onPressEditing", "EditableComponentUI");
      };
      EditableComponentUI.prototype.onReleaseEditing = function(event) {
        Logger.log("onReleaseEditing", "EditableComponentUI");
      };
      EditableComponentUI.prototype.onMoveEditing = function(event) {
        if (true == this.onPressing) {
          Logger.log("onMoveEditing", "EditableComponentUI");
          this.node.position = this.node.position.add(event.getDelta());
        }
      };
      EditableComponentUI.prototype.onPressNotEditing = function(event) {
        Logger.log("onPressNotEditing", "EditableComponentUI");
      };
      EditableComponentUI.prototype.onReleaseNotEditing = function(event) {
        Logger.log("onReleaseNotEditing", "EditableComponentUI");
      };
      EditableComponentUI.prototype.onMoveNotEditing = function(event) {
        Logger.log("onMoveNotEditing", "EditableComponentUI");
      };
      EditableComponentUI.prototype.update = function() {
        var _this = this;
        if (false == this.editing && true == this.onPressing && TimeManager.Instance.realTimeSinceStartScene - this.lastOnPressTimes > this.pressEnterEditModeDeltaTime) {
          this.onPressing = false;
          if (null == this.editUI || void 0 == this.editUI) cc.loader.loadRes(GloableConstantUtils_1.GloableConstantUtils.UIPrefabPath.concat(UINameEnum_1.UINameEnum.EDITE_UI), function(error, res) {
            if (null != error) {
              _this.editing = false;
              return;
            }
            _this.editing = true;
            _this.editUI = cc.instantiate(res);
            _this.editUI.width = _this.node.width;
            _this.editUI.height = _this.node.height;
            _this.editUI.parent = _this.node;
            var layout = _this.editUI.getChildByName("Layout");
            var eventHandler = new cc.Component.EventHandler();
            eventHandler.target = _this.node;
            eventHandler.component = "EditableComponentUI";
            eventHandler.handler = "save";
            layout.getChildByName("ok").getComponent(cc.Button).clickEvents.push(eventHandler);
            eventHandler = new cc.Component.EventHandler();
            eventHandler.target = _this.node;
            eventHandler.component = "EditableComponentUI";
            eventHandler.handler = "cancel";
            layout.getChildByName("cancel").getComponent(cc.Button).clickEvents.push(eventHandler);
            eventHandler = new cc.Component.EventHandler();
            eventHandler.target = _this.node;
            eventHandler.component = "EditableComponentUI";
            eventHandler.handler = "copy";
            layout.getChildByName("add").getComponent(cc.Button).clickEvents.push(eventHandler);
          }); else {
            this.editing = true;
            this.editUI.active = true;
          }
        }
      };
      EditableComponentUI.prototype.cancel = function() {
        this.resetUIStateByConfig();
        this.editing = false;
        null != this.editUI && void 0 != this.editUI && (this.editUI.active = false);
      };
      EditableComponentUI.prototype.copy = function() {
        var _this = this;
        this.clone(function(ui) {
          _this.editing = false;
          if (null != _this.editUI && void 0 != _this.editUI && null != _this.fatherUI && void 0 != _this.fatherUI) {
            var container = _this.fatherUI.node.getComponent(EditableComponentContainer_1.EditableComponentUIContainer);
            _this.editUI.active = false;
            container.addSubUI(ui);
          }
        });
      };
      EditableComponentUI.prototype.save = function() {
        null != this.editUI && void 0 != this.editUI && (this.editUI.active = false);
        this.editing = false;
        if (null == this.fatherUI || void 0 == this.fatherUI) return;
        var father = UIManager_1.UIManager.Instance.GetUI(this.conf.fatherUI);
        this.conf.parentNodePath = GloableUtils_1.GloableUtils.GetNodePath(this.fatherUI.node, this.node.parent);
        this.conf.scale = this.node.scale;
        this.conf.pos = this.node.position;
        Logger.info(this.conf);
        this.conf.Save();
      };
      EditableComponentUI.prototype.clone = function(callback) {
        var editableCount = LocalStorageUtils.getNumber(LocalStorageEnum_1.LocalStorageEnum.EDITABLE_UI_COUNT) + 1;
        LocalStorageUtils.setNumber(LocalStorageEnum_1.LocalStorageEnum.EDITABLE_UI_COUNT, editableCount);
        var conf = this.conf.clone(LocalStorageEnum_1.LocalStorageEnum.EDITABLE_UI_PREFIX.concat(editableCount.toString()));
        Logger.info(conf);
        conf.pos = conf.pos.add(cc.Vec2.RIGHT.mul(this.node.width));
        conf.Save();
        EditableComponentUIManager_1.EditableComponentUIManager.Instance.LoadEditableComponentUI(conf.Key(), callback);
      };
      EditableComponentUI.prototype.resetUIStateByConfig = function() {
        this.fatherUI = UIManager_1.UIManager.Instance.GetUI(this.conf.fatherUI);
        if (null == this.fatherUI || void 0 == this.fatherUI) return false;
        this.node.parent = cc.find(this.conf.parentNodePath, this.fatherUI.node);
        this.node.scale = this.conf.scale;
        this.node.position = this.conf.pos;
        Logger.info(this.node);
        return true;
      };
      Object.defineProperty(EditableComponentUI.prototype, "Conf", {
        set: function(conf) {
          this.conf = conf;
          if (null != conf && void 0 != conf) {
            this.conf.pos = cc.v2(this.conf.pos.x, this.conf.pos.y);
            this.conf.clone = EditableComponentUIConfigure_1.EditableComponentUIConfigure.prototype.clone;
          }
        },
        enumerable: true,
        configurable: true
      });
      EditableComponentUI.prototype.show = function(data) {};
      EditableComponentUI.prototype.delate = function() {};
      EditableComponentUI.prototype.hide = function() {};
      EditableComponentUI = __decorate([ ccclass ], EditableComponentUI);
      return EditableComponentUI;
    }(cc.Component);
    exports.EditableComponentUI = EditableComponentUI;
    cc._RF.pop();
  }, {
    "../../enum/LocalStorageEnum": "LocalStorageEnum",
    "../../enum/UINameEnum": "UINameEnum",
    "../../manager/EditableComponentUIManager": "EditableComponentUIManager",
    "../../manager/UIManager": "UIManager",
    "../../tools/GloableConstantUtils": "GloableConstantUtils",
    "../../tools/GloableUtils": "GloableUtils",
    "./EditableComponentContainer": "EditableComponentContainer",
    "./EditableComponentUIConfigure": "EditableComponentUIConfigure"
  } ],
  EventEnum: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f9d47tY1oBC/py/nFzmYrXY", "EventEnum");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventEnum;
    (function(EventEnum) {
      EventEnum["GameSceneLoadingProgress"] = "0";
      EventEnum["RefreshLocalizationText"] = "1";
    })(EventEnum = exports.EventEnum || (exports.EventEnum = {}));
    cc._RF.pop();
  }, {} ],
  GameLauncher: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0b8dfG8JZ1CZKnBYQPSA01v", "GameLauncher");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameManager_1 = require("../manager/GameManager");
    var UIManager_1 = require("../manager/UIManager");
    var LocalizationManager_1 = require("../manager/LocalizationManager");
    var ResourcesManager_1 = require("../manager/ResourcesManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var GameLauncher = function(_super) {
      __extends(GameLauncher, _super);
      function GameLauncher() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      GameLauncher_1 = GameLauncher;
      Object.defineProperty(GameLauncher, "Instance", {
        get: function() {
          return this.instance;
        },
        enumerable: true,
        configurable: true
      });
      GameLauncher.prototype.onLoad = function() {
        GameLauncher_1.instance = this;
        cc.game.addPersistRootNode(this.node);
        ResourcesManager_1.ResourcesManager.Instance.Init();
        TimeManager.Instance.Init();
        LocalizationManager_1.LocalizationManager.Instance.Init("cn");
        UIManager_1.UIManager.Instance.Init();
        GameManager_1.GameManager.Instance.Init();
      };
      GameLauncher.prototype.update = function(dt) {
        TimeManager.Instance.Update(dt);
        GameManager_1.GameManager.Instance.Update(dt);
        null != ECS.World.active && void 0 != ECS.World.active && ECS.World.active.update();
      };
      GameLauncher.prototype.onDestroy = function() {};
      GameLauncher.prototype.setScreenFit = function() {};
      var GameLauncher_1;
      GameLauncher.instance = null;
      GameLauncher = GameLauncher_1 = __decorate([ ccclass ], GameLauncher);
      return GameLauncher;
    }(cc.Component);
    exports.default = GameLauncher;
    cc._RF.pop();
  }, {
    "../manager/GameManager": "GameManager",
    "../manager/LocalizationManager": "LocalizationManager",
    "../manager/ResourcesManager": "ResourcesManager",
    "../manager/UIManager": "UIManager"
  } ],
  GameManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "06411YLVhtDQ5LQkf2swjkJ", "GameManager");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameStateLogin_1 = require("../fsm/gameState/GameStateLogin");
    var GameStateSceneLoading_1 = require("../fsm/gameState/GameStateSceneLoading");
    var StateEnum_1 = require("../enum/StateEnum");
    var GameStateMainNormal_1 = require("../fsm/gameState/GameStateMainNormal");
    var GameManager = function() {
      function GameManager() {}
      GameManager.prototype.Init = function() {
        this.stateMachine = FSM.StateMachine.GetBuilder().AddState(new GameStateLogin_1.GameStateLogin()).AddState(new GameStateSceneLoading_1.GameStateSceneLoading()).AddState(new GameStateMainNormal_1.GameStateMainNormal()).build();
        this.stateMachine.ChangeState(StateEnum_1.GameStateEnum.GAME_STATE_LOGIN);
      };
      GameManager.prototype.Update = function(dt) {
        this.stateMachine.Update();
      };
      GameManager.Instance = new GameManager();
      return GameManager;
    }();
    exports.GameManager = GameManager;
    cc._RF.pop();
  }, {
    "../enum/StateEnum": "StateEnum",
    "../fsm/gameState/GameStateLogin": "GameStateLogin",
    "../fsm/gameState/GameStateMainNormal": "GameStateMainNormal",
    "../fsm/gameState/GameStateSceneLoading": "GameStateSceneLoading"
  } ],
  GameStateLogin: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9248bedY4hBY5qH+oMjI0Jz", "GameStateLogin");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var StateEnum_1 = require("../../enum/StateEnum");
    var UIManager_1 = require("../../manager/UIManager");
    var UINameEnum_1 = require("../../enum/UINameEnum");
    var GameStateLogin = function() {
      function GameStateLogin() {
        this.stateType = StateEnum_1.GameStateEnum.GAME_STATE_LOGIN;
      }
      GameStateLogin.prototype.StateEnter = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
        Logger.log("state login", "GameStateLogin");
        UIManager_1.UIManager.Instance.ShowUI(UINameEnum_1.UINameEnum.LOGIN_UI);
      };
      GameStateLogin.prototype.StateEnd = function(currentStateTIme) {
        UIManager_1.UIManager.Instance.HideUI(UINameEnum_1.UINameEnum.LOGIN_UI);
      };
      return GameStateLogin;
    }();
    exports.GameStateLogin = GameStateLogin;
    cc._RF.pop();
  }, {
    "../../enum/StateEnum": "StateEnum",
    "../../enum/UINameEnum": "UINameEnum",
    "../../manager/UIManager": "UIManager"
  } ],
  GameStateMainNormal: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "db97e4xE5VO07XQxyKMmVyi", "GameStateMainNormal");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var StateEnum_1 = require("../../enum/StateEnum");
    var UIManager_1 = require("../../manager/UIManager");
    var UINameEnum_1 = require("../../enum/UINameEnum");
    var InputSystem_1 = require("../../ecs/system/InputSystem");
    var MapSystem_1 = require("../../ecs/system/MapSystem");
    var ViewSyncSystem_1 = require("../../ecs/system/ViewSyncSystem");
    var MotionControllerSystem_1 = require("../../ecs/system/MotionControllerSystem");
    var PlayerMotionSyncSystem_1 = require("../../ecs/system/PlayerMotionSyncSystem");
    var RoleSystem_1 = require("../../ecs/system/RoleSystem");
    var GameStateMainNormal = function() {
      function GameStateMainNormal() {
        this.stateType = StateEnum_1.GameStateEnum.GAME_STATE_MAIN_NORMAL;
      }
      GameStateMainNormal.prototype.StateEnter = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
        UIManager_1.UIManager.Instance.ShowUI(UINameEnum_1.UINameEnum.MAIN_UI);
        this.world = ECS.World.CreateAWorld("simsivil");
        this.world.addSystem(RoleSystem_1.default);
        this.world.addSystem(InputSystem_1.default);
        this.world.addSystem(MapSystem_1.default);
        this.world.addSystem(ViewSyncSystem_1.default);
        this.world.addSystem(MotionControllerSystem_1.default);
        this.world.addSystem(PlayerMotionSyncSystem_1.default);
      };
      GameStateMainNormal.prototype.StateUpdate = function(currentStateTime) {};
      GameStateMainNormal.prototype.StateEnd = function(currentStateTIme) {
        UIManager_1.UIManager.Instance.HideUI(UINameEnum_1.UINameEnum.MAIN_UI);
        ECS.World.RemoveWorld("simsivil");
        this.world = null;
      };
      return GameStateMainNormal;
    }();
    exports.GameStateMainNormal = GameStateMainNormal;
    cc._RF.pop();
  }, {
    "../../ecs/system/InputSystem": "InputSystem",
    "../../ecs/system/MapSystem": "MapSystem",
    "../../ecs/system/MotionControllerSystem": "MotionControllerSystem",
    "../../ecs/system/PlayerMotionSyncSystem": "PlayerMotionSyncSystem",
    "../../ecs/system/RoleSystem": "RoleSystem",
    "../../ecs/system/ViewSyncSystem": "ViewSyncSystem",
    "../../enum/StateEnum": "StateEnum",
    "../../enum/UINameEnum": "UINameEnum",
    "../../manager/UIManager": "UIManager"
  } ],
  GameStateSceneLoading: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5bbf6SuyHVKSL+l93+spA1c", "GameStateSceneLoading");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var StateEnum_1 = require("../../enum/StateEnum");
    var UIManager_1 = require("../../manager/UIManager");
    var UINameEnum_1 = require("../../enum/UINameEnum");
    var GameLauncher_1 = require("../../logic/GameLauncher");
    var EventEnum_1 = require("../../enum/EventEnum");
    var GameManager_1 = require("../../manager/GameManager");
    var GameStateSceneLoading = function() {
      function GameStateSceneLoading() {
        this.stateType = StateEnum_1.GameStateEnum.GAME_STATE_SCENE_LOADING;
      }
      GameStateSceneLoading.prototype.StateEnter = function(sceneName, gameStateAfterLoadScene) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) args[_i - 2] = arguments[_i];
        UIManager_1.UIManager.Instance.ShowUI(UINameEnum_1.UINameEnum.LOADING_UI);
        cc.director.loadScene(sceneName, function() {
          var _a;
          (_a = GameManager_1.GameManager.Instance.stateMachine).ChangeState.apply(_a, [ gameStateAfterLoadScene ].concat(args));
        });
      };
      GameStateSceneLoading.prototype.StateUpdate = function(currentStateTime) {
        GameLauncher_1.default.Instance.node.emit(EventEnum_1.EventEnum.GameSceneLoadingProgress, currentStateTime);
      };
      GameStateSceneLoading.prototype.StateEnd = function(currentStateTIme) {
        UIManager_1.UIManager.Instance.HideUI(UINameEnum_1.UINameEnum.LOADING_UI);
      };
      return GameStateSceneLoading;
    }();
    exports.GameStateSceneLoading = GameStateSceneLoading;
    cc._RF.pop();
  }, {
    "../../enum/EventEnum": "EventEnum",
    "../../enum/StateEnum": "StateEnum",
    "../../enum/UINameEnum": "UINameEnum",
    "../../logic/GameLauncher": "GameLauncher",
    "../../manager/GameManager": "GameManager",
    "../../manager/UIManager": "UIManager"
  } ],
  GloableConstantUtils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fdba0DRkoBLcKywyb9dWZSz", "GloableConstantUtils");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GloableConstantUtils = function() {
      function GloableConstantUtils() {}
      GloableConstantUtils.UIPrefabPath = "prefab/ui/";
      GloableConstantUtils.TestPrefabPath = "prefab/test/";
      GloableConstantUtils.GamePrefabPath = "prefab/game/";
      GloableConstantUtils.JsonPath = "json/";
      return GloableConstantUtils;
    }();
    exports.GloableConstantUtils = GloableConstantUtils;
    cc._RF.pop();
  }, {} ],
  GloableUtils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0008ew41hJGPJOX3QUVe7Mw", "GloableUtils");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UIManager_1 = require("../manager/UIManager");
    var UINameEnum_1 = require("../enum/UINameEnum");
    var TipsStruct = function() {
      function TipsStruct(content, okCallBack, cancelCallBack) {
        this.content = content;
        this.okCallBack = okCallBack;
        this.cancelCallBack = cancelCallBack;
      }
      return TipsStruct;
    }();
    var GloableUtils = function() {
      function GloableUtils() {}
      GloableUtils.ShowTips = function(content, okCallBack, cancelCallBack) {
        void 0 === okCallBack && (okCallBack = null);
        void 0 === cancelCallBack && (cancelCallBack = null);
        null == GloableUtils.tipsPendingQueue && (GloableUtils.tipsPendingQueue = new Tools.Queue());
        GloableUtils.tipsPendingQueue.Enqueue(new TipsStruct(content, okCallBack, cancelCallBack));
        1 == GloableUtils.tipsPendingQueue.count && GloableUtils.RealShowTips();
      };
      GloableUtils.RealShowTips = function() {
        var tip = GloableUtils.tipsPendingQueue.first;
        UIManager_1.UIManager.Instance.ShowUI(UINameEnum_1.UINameEnum.POP_UP_WARNING_UI, function(error, _popUpWarningUI) {
          if (null == error) {
            Logger.log("show tips,content:" + tip.content, "TIP");
            _popUpWarningUI.text.string = tip.content;
          } else GloableUtils.tipsPendingQueue.Dequeue();
        });
      };
      GloableUtils.TipsOnclickOk = function() {
        var tip = GloableUtils.tipsPendingQueue.Dequeue();
        null != tip.okCallBack && tip.okCallBack();
        Logger.log("click ok,content:" + tip.content, "TIP");
        0 == GloableUtils.tipsPendingQueue.count ? UIManager_1.UIManager.Instance.HideUI(UINameEnum_1.UINameEnum.POP_UP_WARNING_UI) : GloableUtils.RealShowTips();
      };
      GloableUtils.TipsOnclickCancel = function() {
        var tip = GloableUtils.tipsPendingQueue.Dequeue();
        null != tip.cancelCallBack && tip.cancelCallBack();
        Logger.log("click cancel,content:" + tip.content, "TIP");
        0 == GloableUtils.tipsPendingQueue.count ? UIManager_1.UIManager.Instance.HideUI(UINameEnum_1.UINameEnum.POP_UP_WARNING_UI) : GloableUtils.RealShowTips();
      };
      GloableUtils.GetNodePath = function(from, to) {
        var ret = null;
        while (null != to && void 0 != to && from != to) {
          ret = null != ret ? to.name.concat("/".concat(ret)) : to.name;
          to = to.parent;
        }
        return ret;
      };
      GloableUtils.Delay = function(time) {
        return new Promise(function(resolve, reject) {
          setTimeout(function() {
            return resolve();
          }, time);
        });
      };
      GloableUtils.tipsPendingQueue = null;
      return GloableUtils;
    }();
    exports.GloableUtils = GloableUtils;
    cc._RF.pop();
  }, {
    "../enum/UINameEnum": "UINameEnum",
    "../manager/UIManager": "UIManager"
  } ],
  GraphicComponent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "98665umGAxLYLGtM9VSFcOT", "GraphicComponent");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GraphicComponent = function() {
      function GraphicComponent() {}
      return GraphicComponent;
    }();
    exports.default = GraphicComponent;
    cc._RF.pop();
  }, {} ],
  InputData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e2003rIYB9FkI6d5OKdWKjm", "InputData");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var InputData = function() {
      function InputData() {}
      return InputData;
    }();
    exports.default = InputData;
    cc._RF.pop();
  }, {} ],
  InputSystem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5c52fc6VXJIoKuiK/MtVC8y", "InputSystem");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var InputData_1 = require("../sharedComponent/InputData");
    var GameLauncher_1 = require("../../logic/GameLauncher");
    var InputSystem = function(_super) {
      __extends(InputSystem, _super);
      function InputSystem() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      InputSystem.prototype.OnStart = function() {
        ECS.World.active.EntitisManager.addSharedComponent(InputData_1.default);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        GameLauncher_1.default.Instance.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
        GameLauncher_1.default.Instance.node.on(cc.Node.EventType.MOUSE_UP, this.onMouseUp, this);
        GameLauncher_1.default.Instance.node.on(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
      };
      InputSystem.prototype.OnDestroy = function() {
        ECS.World.active.EntitisManager.removeSharedComponent(InputData_1.default);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        GameLauncher_1.default.Instance.node.off(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
        GameLauncher_1.default.Instance.node.off(cc.Node.EventType.MOUSE_UP, this.onMouseUp, this);
        GameLauncher_1.default.Instance.node.off(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
      };
      InputSystem.prototype.OnUpdate = function() {};
      InputSystem.prototype.onMouseDown = function(event) {
        switch (event.getButton()) {
         case cc.Event.EventMouse.BUTTON_LEFT:
          InputData_1.default.instance.mouse_left = true;
          break;

         case cc.Event.EventMouse.BUTTON_RIGHT:
          InputData_1.default.instance.mouse_right = true;
        }
        InputData_1.default.instance.mousePosition = event.getLocation();
        InputData_1.default.instance.time = TimeManager.Instance.realTimeSinceStartScene;
      };
      InputSystem.prototype.onMouseUp = function(event) {
        switch (event.getButton()) {
         case cc.Event.EventMouse.BUTTON_LEFT:
          InputData_1.default.instance.mouse_left = false;
          break;

         case cc.Event.EventMouse.BUTTON_RIGHT:
          InputData_1.default.instance.mouse_right = false;
        }
        InputData_1.default.instance.mousePosition = event.getLocation();
        InputData_1.default.instance.time = TimeManager.Instance.realTimeSinceStartScene;
      };
      InputSystem.prototype.onMouseMove = function(event) {
        InputData_1.default.instance.mousePosition = event.getLocation();
        InputData_1.default.instance.time = TimeManager.Instance.realTimeSinceStartScene;
      };
      InputSystem.prototype.onKeyDown = function(event) {
        switch (event.keyCode) {
         case cc.macro.KEY.w:
          InputData_1.default.instance.up = true;
          break;

         case cc.macro.KEY.a:
          InputData_1.default.instance.left = true;
          break;

         case cc.macro.KEY.s:
          InputData_1.default.instance.down = true;
          break;

         case cc.macro.KEY.d:
          InputData_1.default.instance.right = true;
        }
        InputData_1.default.instance.time = TimeManager.Instance.realTimeSinceStartScene;
      };
      InputSystem.prototype.onKeyUp = function(event) {
        switch (event.keyCode) {
         case cc.macro.KEY.w:
          InputData_1.default.instance.up = false;
          break;

         case cc.macro.KEY.a:
          InputData_1.default.instance.left = false;
          break;

         case cc.macro.KEY.s:
          InputData_1.default.instance.down = false;
          break;

         case cc.macro.KEY.d:
          InputData_1.default.instance.right = false;
        }
        InputData_1.default.instance.time = TimeManager.Instance.realTimeSinceStartScene;
      };
      return InputSystem;
    }(ECS.ComponentSystem);
    exports.default = InputSystem;
    cc._RF.pop();
  }, {
    "../../logic/GameLauncher": "GameLauncher",
    "../sharedComponent/InputData": "InputData"
  } ],
  JsonConfigNameEnum: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "836b4zYSEVOUaT+cLzaxwya", "JsonConfigNameEnum");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var JsonConfigNameEnum;
    (function(JsonConfigNameEnum) {
      JsonConfigNameEnum["Language_CN"] = "cn";
      JsonConfigNameEnum["Language_EN"] = "en";
      JsonConfigNameEnum["Client_Config"] = "ClientConfig";
    })(JsonConfigNameEnum = exports.JsonConfigNameEnum || (exports.JsonConfigNameEnum = {}));
    cc._RF.pop();
  }, {} ],
  JsonConfigUtils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d169eVRYu1CeJ93bkuNsFEU", "JsonConfigUtils");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GloableConstantUtils_1 = require("./GloableConstantUtils");
    var JsonConigUtils = function() {
      function JsonConigUtils() {}
      JsonConigUtils.ReadJsonObjectByPath = function(path, callBack) {
        if (void 0 != JsonConigUtils.jsonObjectDict[path] && null != JsonConigUtils.jsonObjectDict[path]) {
          callBack(null, JsonConigUtils.jsonObjectDict[path]);
          return;
        }
        cc.loader.loadRes(path, cc.TextAsset, function(error, res) {
          JsonConigUtils.jsonObjectDict[path] = res.json;
          callBack(error, res.json);
        });
      };
      JsonConigUtils.ReadJsonObjectByName = function(name, callBack) {
        if (void 0 != JsonConigUtils.jsonObjectDict[name] && null != JsonConigUtils.jsonObjectDict[name]) {
          callBack(null, JsonConigUtils.jsonObjectDict[name]);
          return;
        }
        cc.loader.loadRes(GloableConstantUtils_1.GloableConstantUtils.JsonPath.concat(name), function(error, res) {
          JsonConigUtils.jsonObjectDict[name] = res.json;
          callBack(error, res.json);
        });
      };
      JsonConigUtils.jsonObjectDict = new Array();
      return JsonConigUtils;
    }();
    exports.JsonConigUtils = JsonConigUtils;
    cc._RF.pop();
  }, {
    "./GloableConstantUtils": "GloableConstantUtils"
  } ],
  LoadingUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dfed1kFWuBIwoqRmUrmL7ji", "LoadingUI");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UIBase_1 = require("../UIBase");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LoadingUI = function(_super) {
      __extends(LoadingUI, _super);
      function LoadingUI() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      LoadingUI.prototype.hide = function() {
        this.node.active = false;
      };
      LoadingUI.prototype.show = function() {
        this.node.active = true;
      };
      LoadingUI = __decorate([ ccclass ], LoadingUI);
      return LoadingUI;
    }(UIBase_1.default);
    exports.default = LoadingUI;
    cc._RF.pop();
  }, {
    "../UIBase": "UIBase"
  } ],
  LocalStorageEnum: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b535bm3Iv9HQISVC6+5qfzw", "LocalStorageEnum");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var LocalStorageEnum;
    (function(LocalStorageEnum) {
      LocalStorageEnum["ACCOUNT_ID"] = "0_";
      LocalStorageEnum["ACCOUNT_PASS_WORD"] = "1_";
      LocalStorageEnum["EDITABLE_UI_COUNT"] = "2_";
      LocalStorageEnum["EDITABLE_UI_PREFIX"] = "3_";
      LocalStorageEnum["EDITABLE_CONTAINER_PREFIX"] = "4_";
      LocalStorageEnum["ENABLE_LOG"] = "5_";
    })(LocalStorageEnum = exports.LocalStorageEnum || (exports.LocalStorageEnum = {}));
    cc._RF.pop();
  }, {} ],
  LocalizationManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d8adaY0EuFMuoQSGnlZT75n", "LocalizationManager");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameLauncher_1 = require("../logic/GameLauncher");
    var EventEnum_1 = require("../enum/EventEnum");
    var JsonConfigNameEnum_1 = require("../enum/JsonConfigNameEnum");
    var JsonConfigUtils_1 = require("../tools/JsonConfigUtils");
    var LocalizationManager = function() {
      function LocalizationManager() {
        this.inited = false;
      }
      LocalizationManager.prototype.Init = function(languageCode) {
        var _this = this;
        languageCode == JsonConfigNameEnum_1.JsonConfigNameEnum.Language_CN ? this.languageCode = JsonConfigNameEnum_1.JsonConfigNameEnum.Language_CN : this.languageCode = JsonConfigNameEnum_1.JsonConfigNameEnum.Language_EN;
        this.inited = false;
        JsonConfigUtils_1.JsonConigUtils.ReadJsonObjectByName(this.languageCode, function(error, object) {
          if (null == error) {
            _this.localizationDictionary = object;
            _this.inited = true;
            GameLauncher_1.default.Instance.node.emit(EventEnum_1.EventEnum.RefreshLocalizationText);
          }
        });
      };
      LocalizationManager.prototype.GetLocalizationTextByKey = function(key) {
        if (false == this.inited) return "...";
        return this.localizationDictionary[key];
      };
      LocalizationManager.prototype.GetLocalizationTextByKeyWithParams = function(key) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) args[_i - 1] = arguments[_i];
        if (false == this.inited) return "...";
        var ret = this.localizationDictionary[key];
        if (void 0 != args) for (var i = 0; i < args.length; i++) ret = ret.replace("{" + i + "}", args[i]);
        return ret;
      };
      LocalizationManager.Instance = new LocalizationManager();
      return LocalizationManager;
    }();
    exports.LocalizationManager = LocalizationManager;
    cc._RF.pop();
  }, {
    "../enum/EventEnum": "EventEnum",
    "../enum/JsonConfigNameEnum": "JsonConfigNameEnum",
    "../logic/GameLauncher": "GameLauncher",
    "../tools/JsonConfigUtils": "JsonConfigUtils"
  } ],
  LoginUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "85fd6rKxWlKYahdSTo36AYb", "LoginUI");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UIBase_1 = require("../UIBase");
    var GameManager_1 = require("../../manager/GameManager");
    var StateEnum_1 = require("../../enum/StateEnum");
    var SceneEnum_1 = require("../../enum/SceneEnum");
    var LocalizationManager_1 = require("../../manager/LocalizationManager");
    var JsonConfigNameEnum_1 = require("../../enum/JsonConfigNameEnum");
    var GloableUtils_1 = require("../../tools/GloableUtils");
    var JsonConfigUtils_1 = require("../../tools/JsonConfigUtils");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var LoginUI = function(_super) {
      __extends(LoginUI, _super);
      function LoginUI() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.accountEditBox = null;
        _this.passwrodEditBox = null;
        _this.loginButton = null;
        _this.registerButton = null;
        _this.ipEditBox = null;
        return _this;
      }
      LoginUI.prototype.hide = function() {
        UIAnimationUtils.ScaleOut(this.node);
      };
      LoginUI.prototype.show = function() {
        var _this = this;
        JsonConfigUtils_1.JsonConigUtils.ReadJsonObjectByName(JsonConfigNameEnum_1.JsonConfigNameEnum.Client_Config, function(error, clientConfig) {
          UIAnimationUtils.ScaleIn(_this.node);
          false == clientConfig.Test ? _this.ipEditBox.enabled = false : _this.ipEditBox.string = clientConfig.ServerIP;
        });
      };
      LoginUI.prototype.onClickLogin = function() {
        var _this = this;
        this.SetButtonEnable(false);
        this.CheckIfConnectServer(function() {
          return _this.onClickLogin();
        }) && SimCivil.Contract.IAuth.LogInAsync(this.accountEditBox.string, this.passwrodEditBox.string).then(function(logined) {
          _this.SetButtonEnable(true);
          null == logined || false == logined ? GloableUtils_1.GloableUtils.ShowTips(LocalizationManager_1.LocalizationManager.Instance.GetLocalizationTextByKey("login_text_tips_error")) : GameManager_1.GameManager.Instance.stateMachine.ChangeState(StateEnum_1.GameStateEnum.GAME_STATE_SCENE_LOADING, SceneEnum_1.SceneEnum.MAIN, StateEnum_1.GameStateEnum.GAME_STATE_MAIN_NORMAL);
        });
      };
      LoginUI.prototype.onClickRegister = function() {
        var _this = this;
        this.SetButtonEnable(false);
        this.CheckIfConnectServer(function() {
          return _this.onClickRegister();
        }) && SimCivil.Contract.IAuth.Register(this.accountEditBox.string, this.passwrodEditBox.string).then(function(success) {
          _this.SetButtonEnable(true);
          null == success || false == success ? GloableUtils_1.GloableUtils.ShowTips(LocalizationManager_1.LocalizationManager.Instance.GetLocalizationTextByKey("register_text_tips_error")) : GloableUtils_1.GloableUtils.ShowTips(LocalizationManager_1.LocalizationManager.Instance.GetLocalizationTextByKey("register_text_tips_success"));
        });
      };
      LoginUI.prototype.SetButtonEnable = function(enable) {
        this.loginButton.interactable = enable;
        this.registerButton.interactable = enable;
      };
      LoginUI.prototype.CheckIfConnectServer = function(callback) {
        var _this = this;
        if (null == RpcClient.Instance.session || false == RpcClient.Instance.session.connected) {
          JsonConfigUtils_1.JsonConigUtils.ReadJsonObjectByName(JsonConfigNameEnum_1.JsonConfigNameEnum.Client_Config, function(error, clientConfig) {
            if (null == error) true == clientConfig.OfflineMode ? GameManager_1.GameManager.Instance.stateMachine.ChangeState(StateEnum_1.GameStateEnum.GAME_STATE_SCENE_LOADING, SceneEnum_1.SceneEnum.MAIN, StateEnum_1.GameStateEnum.GAME_STATE_MAIN_NORMAL) : false == clientConfig.Test ? RpcClient.Instance.Init(clientConfig.ServerIP, callback) : RpcClient.Instance.Init(_this.ipEditBox.string, callback); else {
              _this.SetButtonEnable(true);
              GloableUtils_1.GloableUtils.ShowTips(LocalizationManager_1.LocalizationManager.Instance.GetLocalizationTextByKey("connet_server_error"));
            }
          });
          return false;
        }
        return true;
      };
      __decorate([ property(cc.EditBox) ], LoginUI.prototype, "accountEditBox", void 0);
      __decorate([ property(cc.EditBox) ], LoginUI.prototype, "passwrodEditBox", void 0);
      __decorate([ property(cc.Button) ], LoginUI.prototype, "loginButton", void 0);
      __decorate([ property(cc.Button) ], LoginUI.prototype, "registerButton", void 0);
      __decorate([ property(cc.EditBox) ], LoginUI.prototype, "ipEditBox", void 0);
      LoginUI = __decorate([ ccclass ], LoginUI);
      return LoginUI;
    }(UIBase_1.default);
    exports.default = LoginUI;
    cc._RF.pop();
  }, {
    "../../enum/JsonConfigNameEnum": "JsonConfigNameEnum",
    "../../enum/SceneEnum": "SceneEnum",
    "../../enum/StateEnum": "StateEnum",
    "../../manager/GameManager": "GameManager",
    "../../manager/LocalizationManager": "LocalizationManager",
    "../../tools/GloableUtils": "GloableUtils",
    "../../tools/JsonConfigUtils": "JsonConfigUtils",
    "../UIBase": "UIBase"
  } ],
  MainUIEquipComponent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2bd90K8z/9P4rudxEL0I5HW", "MainUIEquipComponent");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EditableComponentUI_1 = require("../editableui/EditableComponentUI");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var MainUIEquipComponent = function(_super) {
      __extends(MainUIEquipComponent, _super);
      function MainUIEquipComponent() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      MainUIEquipComponent.prototype.priRefresh = function(itemID) {
        this.itemID = itemID;
      };
      MainUIEquipComponent.prototype.pubRefresh = function(itemID) {
        this.itemID = itemID;
        this.conf.data = {
          itemID: itemID
        };
        this.conf.Save();
      };
      MainUIEquipComponent.prototype.show = function(data) {
        var _this = this;
        Logger.log("show", "MainUIEquipComponent");
        this.sprEquip = this.node.getChildByName("equip").getComponent(cc.Sprite);
        this.txtName = this.node.getChildByName("name").getComponent(cc.Label);
        if (null == data) return;
        this.priRefresh(data.itemID);
        this.node.on(cc.Node.EventType.MOUSE_DOWN, function() {
          return _this.onPressCallBack;
        });
      };
      MainUIEquipComponent.prototype.onPressCallBack = function() {
        Logger.log("onPressCallBack", "MainUIEquipComponent");
      };
      MainUIEquipComponent = __decorate([ ccclass ], MainUIEquipComponent);
      return MainUIEquipComponent;
    }(EditableComponentUI_1.EditableComponentUI);
    exports.default = MainUIEquipComponent;
    cc._RF.pop();
  }, {
    "../editableui/EditableComponentUI": "EditableComponentUI"
  } ],
  MainUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3adc0+9+IJOjbQA4CRFJiAk", "MainUI");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UIBase_1 = require("../UIBase");
    var UIManager_1 = require("../../manager/UIManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var MainUI = function(_super) {
      __extends(MainUI, _super);
      function MainUI() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.topNode = null;
        _this.bottomNode = null;
        _this.topLeftNode = null;
        _this.topRightNode = null;
        _this.bottomLeftNode = null;
        _this.bottomRightNode = null;
        _this.centerNode = null;
        return _this;
      }
      MainUI.prototype.onLoad = function() {
        this.topNode.position = cc.Vec2.UP.mulSelf(UIManager_1.UIManager.Instance.Canvas.node.height);
        this.bottomNode.position = cc.Vec2.UP.mulSelf(-UIManager_1.UIManager.Instance.Canvas.node.height);
        this.topLeftNode.position = cc.Vec2.RIGHT.mulSelf(-UIManager_1.UIManager.Instance.Canvas.node.width);
        this.topRightNode.position = cc.Vec2.RIGHT.mulSelf(UIManager_1.UIManager.Instance.Canvas.node.width);
        this.bottomLeftNode.position = cc.Vec2.RIGHT.mulSelf(-UIManager_1.UIManager.Instance.Canvas.node.width);
        this.bottomRightNode.position = cc.Vec2.RIGHT.mulSelf(UIManager_1.UIManager.Instance.Canvas.node.width);
      };
      MainUI.prototype.hide = function() {
        UIAnimationUtils.MoveOut(this.topNode, null, cc.Vec2.UP.mulSelf(UIManager_1.UIManager.Instance.Canvas.node.height));
        UIAnimationUtils.MoveOut(this.bottomNode, null, cc.Vec2.UP.mulSelf(-UIManager_1.UIManager.Instance.Canvas.node.height));
        UIAnimationUtils.MoveOut(this.topLeftNode, null, cc.Vec2.RIGHT.mulSelf(-UIManager_1.UIManager.Instance.Canvas.node.width));
        UIAnimationUtils.MoveOut(this.topRightNode, null, cc.Vec2.RIGHT.mulSelf(UIManager_1.UIManager.Instance.Canvas.node.width));
        UIAnimationUtils.MoveOut(this.bottomLeftNode, null, cc.Vec2.RIGHT.mulSelf(-UIManager_1.UIManager.Instance.Canvas.node.width));
        UIAnimationUtils.MoveOut(this.bottomRightNode, null, cc.Vec2.RIGHT.mulSelf(UIManager_1.UIManager.Instance.Canvas.node.width));
        UIAnimationUtils.ScaleOut(this.centerNode, null);
      };
      MainUI.prototype.show = function() {
        UIAnimationUtils.MoveIn(this.topNode, null);
        UIAnimationUtils.MoveIn(this.bottomNode, null);
        UIAnimationUtils.MoveIn(this.topLeftNode, null);
        UIAnimationUtils.MoveIn(this.topRightNode, null);
        UIAnimationUtils.MoveIn(this.bottomLeftNode, null);
        UIAnimationUtils.MoveIn(this.bottomRightNode, null);
        UIAnimationUtils.ScaleIn(this.centerNode, null);
      };
      __decorate([ property(cc.Node) ], MainUI.prototype, "topNode", void 0);
      __decorate([ property(cc.Node) ], MainUI.prototype, "bottomNode", void 0);
      __decorate([ property(cc.Node) ], MainUI.prototype, "topLeftNode", void 0);
      __decorate([ property(cc.Node) ], MainUI.prototype, "topRightNode", void 0);
      __decorate([ property(cc.Node) ], MainUI.prototype, "bottomLeftNode", void 0);
      __decorate([ property(cc.Node) ], MainUI.prototype, "bottomRightNode", void 0);
      __decorate([ property(cc.Node) ], MainUI.prototype, "centerNode", void 0);
      MainUI = __decorate([ ccclass ], MainUI);
      return MainUI;
    }(UIBase_1.default);
    exports.default = MainUI;
    cc._RF.pop();
  }, {
    "../../manager/UIManager": "UIManager",
    "../UIBase": "UIBase"
  } ],
  MapCeilTypEnum: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "42ba58ILZVDnqCD/cZ8toK4", "MapCeilTypEnum");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var MapCeilTypeEnum;
    (function(MapCeilTypeEnum) {
      MapCeilTypeEnum[MapCeilTypeEnum["grass"] = 0] = "grass";
    })(MapCeilTypeEnum = exports.MapCeilTypeEnum || (exports.MapCeilTypeEnum = {}));
    cc._RF.pop();
  }, {} ],
  MapCeil: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "470adiMN3VFt7gPVm2ObY65", "MapCeil");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var MapCeil = function() {
      function MapCeil(type, id) {
        this._type = type;
        this._id = id;
      }
      Object.defineProperty(MapCeil.prototype, "type", {
        get: function() {
          return this._type;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(MapCeil.prototype, "id", {
        get: function() {
          return this._id;
        },
        enumerable: true,
        configurable: true
      });
      return MapCeil;
    }();
    exports.default = MapCeil;
    cc._RF.pop();
  }, {} ],
  MapDataComponent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "702a1HvRDFM6YZF1shcV/Jd", "MapDataComponent");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var MapDataComponent = function() {
      function MapDataComponent() {}
      return MapDataComponent;
    }();
    exports.default = MapDataComponent;
    cc._RF.pop();
  }, {} ],
  MapSystem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8bbffFETblAdIjUgquZHlvb", "MapSystem");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var MapDataComponent_1 = require("../sharedComponent/MapDataComponent");
    var MapSystem = function(_super) {
      __extends(MapSystem, _super);
      function MapSystem() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      MapSystem.prototype.OnStart = function() {
        ECS.World.active.EntitisManager.addSharedComponent(MapDataComponent_1.default);
      };
      MapSystem.prototype.OnDestroy = function() {
        ECS.World.active.EntitisManager.removeSharedComponent(MapDataComponent_1.default);
      };
      MapSystem.prototype.OnUpdate = function() {};
      return MapSystem;
    }(ECS.ComponentSystem);
    exports.default = MapSystem;
    cc._RF.pop();
  }, {
    "../sharedComponent/MapDataComponent": "MapDataComponent"
  } ],
  MotionComponent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5bf6dBXUwJODael5B4XLnHS", "MotionComponent");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var MotionComponent = function() {
      function MotionComponent() {
        this.speed = 0;
        this.v = cc.Vec2.ZERO;
        this.canMove = true;
      }
      return MotionComponent;
    }();
    exports.default = MotionComponent;
    cc._RF.pop();
  }, {} ],
  MotionControllerComponent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2399ficJ/ND6rAbOPK8mAYG", "MotionControllerComponent");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var MotionControllerComponent = function() {
      function MotionControllerComponent() {
        this.type = 0;
      }
      return MotionControllerComponent;
    }();
    exports.default = MotionControllerComponent;
    cc._RF.pop();
  }, {} ],
  MotionControllerSystem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cf442wmMO9PZLculpsZ+qy/", "MotionControllerSystem");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var MotionComponent_1 = require("../component/MotionComponent");
    var DirectionComponent_1 = require("../component/DirectionComponent");
    var InputData_1 = require("../sharedComponent/InputData");
    var MotionControllerComponent_1 = require("../component/MotionControllerComponent");
    var MotionControllerSystem = function(_super) {
      __extends(MotionControllerSystem, _super);
      function MotionControllerSystem() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      MotionControllerSystem.prototype.OnUpdate = function() {
        if (null == this.entities) return;
        var inputData = InputData_1.default.instance;
        for (var i = 0; i < this.entities.length; i++) if (true == this.motions[i].canMove) {
          this.motionController[i].type;
          this.directions[i].direction = cc.Vec2.ZERO;
          inputData.right && (this.directions[i].direction.x += 1);
          inputData.left && (this.directions[i].direction.x -= 1);
          inputData.up && (this.directions[i].direction.y += 1);
          inputData.down && (this.directions[i].direction.y -= 1);
          this.directions[i].direction.normalizeSelf();
          this.motions[i].v = this.directions[i].direction.mul(this.motions[i].speed);
        }
      };
      __decorate([ ECS.inject(DirectionComponent_1.default) ], MotionControllerSystem.prototype, "directions", void 0);
      __decorate([ ECS.inject(MotionComponent_1.default) ], MotionControllerSystem.prototype, "motions", void 0);
      __decorate([ ECS.inject(MotionControllerComponent_1.default) ], MotionControllerSystem.prototype, "motionController", void 0);
      return MotionControllerSystem;
    }(ECS.ComponentSystem);
    exports.default = MotionControllerSystem;
    cc._RF.pop();
  }, {
    "../component/DirectionComponent": "DirectionComponent",
    "../component/MotionComponent": "MotionComponent",
    "../component/MotionControllerComponent": "MotionControllerComponent",
    "../sharedComponent/InputData": "InputData"
  } ],
  MovementTest: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "27e3d7+AHdIboJqy5Na1SoR", "MovementTest");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var MovementTest = function(_super) {
      __extends(MovementTest, _super);
      function MovementTest() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.speed = 1;
        return _this;
      }
      MovementTest_1 = MovementTest;
      MovementTest.prototype.start = function() {
        return __awaiter(this, void 0, void 0, function() {
          var inited, createRoleOption, success, _a, _b;
          var _this = this;
          return __generator(this, function(_c) {
            switch (_c.label) {
             case 0:
              this.node.position = cc.Vec2.ZERO;
              inited = false;
              Logger.log("start", "MovementTest");
              this.pressing_w = false;
              this.pressing_a = false;
              this.pressing_s = false;
              this.pressing_d = false;
              createRoleOption = new SimCivil.Contract.CreateRoleOption();
              createRoleOption.Gender = SimCivil.Contract.Gender.male;
              createRoleOption.Name = "jyk";
              createRoleOption.Race = SimCivil.Contract.Race.human;
              return [ 4, SimCivil.Contract.IRoleManager.CreateRole(createRoleOption) ];

             case 1:
              success = _c.sent();
              true == success ? Logger.log("CreateRole success\uff01", "MovementTest") : Logger.log("CreateRole faild", "MovementTest");
              _b = (_a = SimCivil.Contract.IRoleManager).UseRole;
              return [ 4, SimCivil.Contract.IRoleManager.GetRoleList() ];

             case 2:
              return [ 4, _b.apply(_a, [ _c.sent()[0].Id ]) ];

             case 3:
              success = _c.sent();
              if (!(true == success)) return [ 3, 5 ];
              Logger.log("UseRole success\uff01", "MovementTest");
              return [ 4, SimCivil.Contract.IViewSynchronizer.RegisterViewSync(function(viewChanged) {
                viewChanged = viewChanged;
                if (false == inited) {
                  _this.node.position = _this.serverPosToUIPos(new cc.Vec2(viewChanged.Position.Item1, viewChanged.Position.Item2));
                  inited = true;
                  _this.schedule(function() {
                    return _this.logicUpdate();
                  }, MovementTest_1.deltaTimePreFrame);
                }
                Logger.info(viewChanged);
              }) ];

             case 4:
              _c.sent();
              return [ 3, 6 ];

             case 5:
              Logger.log("UseRole faild", "MovementTest");
              _c.label = 6;

             case 6:
              cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
              cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
              return [ 2 ];
            }
          });
        });
      };
      MovementTest.prototype.logicUpdate = function() {
        Logger.log(this.node.position, name);
        var serverPos = this.uiPosToServerPos(this.node.position);
        SimCivil.Contract.IPlayerController.MoveTo(new SimCivil.Contract.ValueTuple({
          Item1: serverPos.x,
          Item2: serverPos.y
        }), new Date());
      };
      MovementTest.prototype.update = function(dt) {
        var v = new cc.Vec2(0, 0);
        this.pressing_w && v.addSelf(cc.Vec2.UP);
        this.pressing_a && v.subSelf(cc.Vec2.RIGHT);
        this.pressing_s && v.subSelf(cc.Vec2.UP);
        this.pressing_d && v.addSelf(cc.Vec2.RIGHT);
        v.normalizeSelf();
        this.node.position = this.node.position.add(this.serverPosToUIPos(v.mul(this.speed * dt)));
      };
      MovementTest.prototype.uiPosToServerPos = function(pos) {
        return new cc.Vec2(pos.x / 100, pos.y / 100);
      };
      MovementTest.prototype.serverPosToUIPos = function(pos) {
        return pos.mul(100);
      };
      MovementTest.prototype.onKeyDown = function(event) {
        switch (event.keyCode) {
         case cc.macro.KEY.w:
          this.pressing_w = true;
          break;

         case cc.macro.KEY.a:
          this.pressing_a = true;
          break;

         case cc.macro.KEY.s:
          this.pressing_s = true;
          break;

         case cc.macro.KEY.d:
          this.pressing_d = true;
        }
      };
      MovementTest.prototype.onKeyUp = function(event) {
        switch (event.keyCode) {
         case cc.macro.KEY.w:
          this.pressing_w = false;
          break;

         case cc.macro.KEY.a:
          this.pressing_a = false;
          break;

         case cc.macro.KEY.s:
          this.pressing_s = false;
          break;

         case cc.macro.KEY.d:
          this.pressing_d = false;
        }
      };
      var MovementTest_1;
      MovementTest.deltaTimePreFrame = 1;
      MovementTest = MovementTest_1 = __decorate([ ccclass ], MovementTest);
      return MovementTest;
    }(cc.Component);
    exports.default = MovementTest;
    cc._RF.pop();
  }, {} ],
  Npc: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "877cfTRpQdD9LCJAMhiG5Tu", "Npc");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Npc = function(_super) {
      __extends(Npc, _super);
      function Npc() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      Object.defineProperty(Npc.prototype, "entity", {
        get: function() {
          return this._entity;
        },
        enumerable: true,
        configurable: true
      });
      Npc = __decorate([ ccclass ], Npc);
      return Npc;
    }(cc.Component);
    exports.default = Npc;
    cc._RF.pop();
  }, {} ],
  PlayerMotionSyncSystem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "20cfalIhZVA1Zlq+cA8Vt0z", "PlayerMotionSyncSystem");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var MotionComponent_1 = require("../component/MotionComponent");
    var MotionControllerComponent_1 = require("../component/MotionControllerComponent");
    var PositionComponent_1 = require("../component/PositionComponent");
    var PlayerMotionSyncSystem = function(_super) {
      __extends(PlayerMotionSyncSystem, _super);
      function PlayerMotionSyncSystem() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      PlayerMotionSyncSystem.prototype.OnStart = function() {
        this.lastTime = TimeManager.Instance.realTimeSinceStartScene;
      };
      PlayerMotionSyncSystem.prototype.OnUpdate = function() {
        if (this.motion.length > 0) {
          this.pos[0].position = this.pos[0].position.add(this.motion[0].v.mul(TimeManager.Instance.realTimeSinceStartScene - this.lastTime));
          SimCivil.Contract.IPlayerController.MoveTo(new SimCivil.Contract.ValueTuple({
            Item1: this.pos[0].position.x,
            Item2: this.pos[0].position.y
          }), new Date());
        }
        this.lastTime = TimeManager.Instance.realTimeSinceStartScene;
      };
      __decorate([ ECS.inject(PositionComponent_1.default) ], PlayerMotionSyncSystem.prototype, "pos", void 0);
      __decorate([ ECS.inject(MotionComponent_1.default) ], PlayerMotionSyncSystem.prototype, "motion", void 0);
      __decorate([ ECS.inject(MotionControllerComponent_1.default) ], PlayerMotionSyncSystem.prototype, "controller", void 0);
      return PlayerMotionSyncSystem;
    }(ECS.ComponentSystem);
    exports.default = PlayerMotionSyncSystem;
    cc._RF.pop();
  }, {
    "../component/MotionComponent": "MotionComponent",
    "../component/MotionControllerComponent": "MotionControllerComponent",
    "../component/PositionComponent": "PositionComponent"
  } ],
  Player: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d44576A8VpP97b9YORzMgN7", "Player");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var MotionComponent_1 = require("../../ecs/component/MotionComponent");
    var PositionComponent_1 = require("../../ecs/component/PositionComponent");
    var MotionControllerComponent_1 = require("../../ecs/component/MotionControllerComponent");
    var DirectionComponent_1 = require("../../ecs/component/DirectionComponent");
    var Npc_1 = require("./Npc");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var Player = function(_super) {
      __extends(Player, _super);
      function Player() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      Player.prototype.start = function() {
        this._entity = ECS.World.active.EntitisManager.CreateAEntity();
        ECS.World.active.EntitisManager.addComponent(this._entity, MotionComponent_1.default, PositionComponent_1.default, MotionControllerComponent_1.default, DirectionComponent_1.default);
        Logger.log("add player");
        this.posComp = ECS.World.active.EntitisManager.GetComponent(this._entity, PositionComponent_1.default);
      };
      Player.prototype.update = function() {
        this.node.position = this.posComp.position.mul(10);
      };
      Player = __decorate([ ccclass ], Player);
      return Player;
    }(Npc_1.default);
    exports.default = Player;
    cc._RF.pop();
  }, {
    "../../ecs/component/DirectionComponent": "DirectionComponent",
    "../../ecs/component/MotionComponent": "MotionComponent",
    "../../ecs/component/MotionControllerComponent": "MotionControllerComponent",
    "../../ecs/component/PositionComponent": "PositionComponent",
    "./Npc": "Npc"
  } ],
  PopupWarningUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1d5923CL8ZOPIyPH1il1aeS", "PopupWarningUI");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UIBase_1 = require("./UIBase");
    var GloableUtils_1 = require("../tools/GloableUtils");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PopupWarningUI = function(_super) {
      __extends(PopupWarningUI, _super);
      function PopupWarningUI() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.text = null;
        return _this;
      }
      PopupWarningUI.prototype.hide = function() {
        UIAnimationUtils.ScaleOut(this.node);
      };
      PopupWarningUI.prototype.show = function() {
        UIAnimationUtils.ScaleIn(this.node);
      };
      PopupWarningUI.prototype.clickOk = function() {
        GloableUtils_1.GloableUtils.TipsOnclickOk();
      };
      PopupWarningUI.prototype.clickCancel = function() {
        GloableUtils_1.GloableUtils.TipsOnclickCancel();
      };
      __decorate([ property(cc.Label) ], PopupWarningUI.prototype, "text", void 0);
      PopupWarningUI = __decorate([ ccclass ], PopupWarningUI);
      return PopupWarningUI;
    }(UIBase_1.default);
    exports.default = PopupWarningUI;
    cc._RF.pop();
  }, {
    "../tools/GloableUtils": "GloableUtils",
    "./UIBase": "UIBase"
  } ],
  PositionComponent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b75ecH6AD5P27gQ7Re/Kq5B", "PositionComponent");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var PositionComponent = function() {
      function PositionComponent() {
        this.position = cc.Vec2.ZERO;
      }
      return PositionComponent;
    }();
    exports.default = PositionComponent;
    cc._RF.pop();
  }, {} ],
  ResourcesManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "381adfWfv1FV7Exm6dQCyL7", "ResourcesManager");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ResourcesManager = function() {
      function ResourcesManager() {}
      ResourcesManager.prototype.Init = function() {};
      ResourcesManager.prototype.loadRes = function(path, callback) {
        cc.loader.loadRes(path, callback);
      };
      ResourcesManager.Instance = new ResourcesManager();
      return ResourcesManager;
    }();
    exports.ResourcesManager = ResourcesManager;
    cc._RF.pop();
  }, {} ],
  RoleSystem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3a299Ze1GNNjpEZABNEgmyf", "RoleSystem");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GloableConstantUtils_1 = require("../../tools/GloableConstantUtils");
    var ResourcesManager_1 = require("../../manager/ResourcesManager");
    var EcsUtility_1 = require("../utility/EcsUtility");
    var RoleSystem = function(_super) {
      __extends(RoleSystem, _super);
      function RoleSystem() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      RoleSystem.prototype.OnStart = function() {
        var _this = this;
        var createRoleOption = new SimCivil.Contract.CreateRoleOption();
        createRoleOption.Gender = SimCivil.Contract.Gender.male;
        createRoleOption.Name = "jyk";
        createRoleOption.Race = SimCivil.Contract.Race.human;
        EcsUtility_1.EcsUtility.GotRole = false;
        (function() {
          return __awaiter(_this, void 0, void 0, function() {
            var success, _a, _b, _c;
            return __generator(this, function(_d) {
              switch (_d.label) {
               case 0:
                return [ 4, SimCivil.Contract.IRoleManager.CreateRole(createRoleOption) ];

               case 1:
                success = _d.sent();
                true == success ? Logger.log("CreateRole success\uff01", "MovementTest") : Logger.log("CreateRole faild", "MovementTest");
                _a = EcsUtility_1.EcsUtility;
                _c = (_b = SimCivil.Contract.IRoleManager).UseRole;
                return [ 4, SimCivil.Contract.IRoleManager.GetRoleList() ];

               case 2:
                return [ 4, _c.apply(_b, [ _d.sent()[0].Id ]) ];

               case 3:
                _a.GotRole = _d.sent();
                true == EcsUtility_1.EcsUtility.GotRole ? ResourcesManager_1.ResourcesManager.Instance.loadRes(GloableConstantUtils_1.GloableConstantUtils.GamePrefabPath.concat("Player"), function(error, res) {
                  var node = cc.instantiate(res);
                  node.setParent(cc.Canvas.instance.node);
                }) : Logger.log("UseRole faild", "MovementTest");
                return [ 2 ];
              }
            });
          });
        })();
      };
      RoleSystem.prototype.OnDestroy = function() {
        EcsUtility_1.EcsUtility.GotRole = false;
      };
      RoleSystem.prototype.OnUpdate = function() {};
      return RoleSystem;
    }(ECS.ComponentSystem);
    exports.default = RoleSystem;
    cc._RF.pop();
  }, {
    "../../manager/ResourcesManager": "ResourcesManager",
    "../../tools/GloableConstantUtils": "GloableConstantUtils",
    "../utility/EcsUtility": "EcsUtility"
  } ],
  SceneEnum: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1af1a1KMtlBQa2+1bCV/U41", "SceneEnum");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var SceneEnum;
    (function(SceneEnum) {
      SceneEnum["MAIN"] = "main";
      SceneEnum["LAUNCHER"] = "launcher";
    })(SceneEnum = exports.SceneEnum || (exports.SceneEnum = {}));
    cc._RF.pop();
  }, {} ],
  SizeComponent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fa573VRhLNGvKipxojDfY9p", "SizeComponent");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var SizeComponent = function() {
      function SizeComponent() {}
      return SizeComponent;
    }();
    exports.default = SizeComponent;
    cc._RF.pop();
  }, {} ],
  StateEnum: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "29b9ctEixBAKr6iH86UBQPJ", "StateEnum");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameStateEnum;
    (function(GameStateEnum) {
      GameStateEnum[GameStateEnum["GAME_STATE_LOGIN"] = 0] = "GAME_STATE_LOGIN";
      GameStateEnum[GameStateEnum["GAME_STATE_SCENE_LOADING"] = 1] = "GAME_STATE_SCENE_LOADING";
      GameStateEnum[GameStateEnum["GAME_STATE_MAIN_NORMAL"] = 2] = "GAME_STATE_MAIN_NORMAL";
    })(GameStateEnum = exports.GameStateEnum || (exports.GameStateEnum = {}));
    cc._RF.pop();
  }, {} ],
  TestComponent2: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "590141a2TBEg70CSjc1E2yo", "TestComponent2");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var TestComponent2 = function() {
      function TestComponent2() {}
      return TestComponent2;
    }();
    exports.default = TestComponent2;
    cc._RF.pop();
  }, {} ],
  TestComponent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7399cBpIRFIm6N7HcUAe0YN", "TestComponent");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var TestComponent = function() {
      function TestComponent() {}
      return TestComponent;
    }();
    exports.default = TestComponent;
    cc._RF.pop();
  }, {} ],
  TextLocalization: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "80575NOVc1KPLH+qkR9bE9+", "TextLocalization");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventEnum_1 = require("../enum/EventEnum");
    var LocalizationManager_1 = require("../manager/LocalizationManager");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var TextLocalization = function(_super) {
      __extends(TextLocalization, _super);
      function TextLocalization() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.key = "";
        _this.text = null;
        return _this;
      }
      TextLocalization.prototype.onLoad = function() {
        this.text = this.node.getComponent(cc.Label);
        null == this.text && (this.text = this.node.getComponent(cc.RichText));
        null == this.text && (this.text = this.node.getComponent(cc.EditBox));
        this.refreshLocalization();
        this.node.on(EventEnum_1.EventEnum.RefreshLocalizationText, this.refreshLocalization);
      };
      TextLocalization.prototype.onDestroy = function() {
        this.node.off(EventEnum_1.EventEnum.RefreshLocalizationText, this.refreshLocalization);
      };
      TextLocalization.prototype.refreshLocalization = function() {
        if (null != this.text) if (this.text instanceof cc.EditBox) {
          var tText = this.text;
          tText.placeholder = LocalizationManager_1.LocalizationManager.Instance.GetLocalizationTextByKey(this.key);
        } else this.text.string = LocalizationManager_1.LocalizationManager.Instance.GetLocalizationTextByKey(this.key);
      };
      __decorate([ property ], TextLocalization.prototype, "key", void 0);
      TextLocalization = __decorate([ ccclass ], TextLocalization);
      return TextLocalization;
    }(cc.Component);
    exports.default = TextLocalization;
    cc._RF.pop();
  }, {
    "../enum/EventEnum": "EventEnum",
    "../manager/LocalizationManager": "LocalizationManager"
  } ],
  UIAnimationUtils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8611ciZCwBIxIdzCwicxPyd", "UIAnimationUtils");
    var UIAnimationUtils = function() {
      function UIAnimationUtils() {}
      UIAnimationUtils.ScaleIn = function(node, callBack, fromScale, toScale) {
        void 0 === fromScale && (fromScale = 0);
        void 0 === toScale && (toScale = 1);
        node.active = true;
        node.scale = fromScale;
        node.stopAllActions();
        var scalIn = cc.scaleTo(.5, toScale).easing(cc.easeBackOut());
        if (void 0 != callBack && null != callBack) {
          var sequence = cc.sequence(scalIn, cc.callFunc(callBack));
          node.runAction(sequence);
        } else node.runAction(scalIn);
      };
      UIAnimationUtils.ScaleOut = function(node, callBack, fromScale, toScale) {
        void 0 === fromScale && (fromScale = 1);
        void 0 === toScale && (toScale = 0);
        node.scale = fromScale;
        node.stopAllActions();
        var scalIn = cc.scaleTo(.5, toScale).easing(cc.easeBackIn());
        var sequence = cc.sequence(scalIn, cc.callFunc(function() {
          node.active = false;
          void 0 != callBack && null != callBack && callBack();
        }));
        node.runAction(sequence);
      };
      UIAnimationUtils.MoveIn = function(node, callBack, toPos, fromPos) {
        void 0 === toPos && (toPos = cc.Vec2.ZERO);
        void 0 === fromPos && (fromPos = null);
        node.active = true;
        null != fromPos && (node.position = fromPos);
        node.stopAllActions();
        var moveIn = cc.moveTo(1, toPos).easing(cc.easeBackOut());
        if (void 0 != callBack && null != callBack) {
          var sequence = cc.sequence(moveIn, cc.callFunc(callBack));
          node.runAction(sequence);
        } else node.runAction(moveIn);
      };
      UIAnimationUtils.MoveOut = function(node, callBack, toPos, fromPos) {
        void 0 === toPos && (toPos = cc.Vec2.ZERO);
        void 0 === fromPos && (fromPos = null);
        null != fromPos && (node.position = fromPos);
        node.stopAllActions();
        var scalIn = cc.moveTo(1, toPos).easing(cc.easeBackIn());
        var sequence = cc.sequence(scalIn, cc.callFunc(function() {
          node.active = false;
          void 0 != callBack && null != callBack && callBack();
        }));
        node.runAction(sequence);
      };
      return UIAnimationUtils;
    }();
    cc._RF.pop();
  }, {} ],
  UIBase: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "49e920GPCZCLbsZZhLVQ7R6", "UIBase");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, disallowMultiple = _a.disallowMultiple;
    var UIBase = function(_super) {
      __extends(UIBase, _super);
      function UIBase() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.zIndex = 0;
        return _this;
      }
      UIBase.prototype.init = function() {
        this.node.zIndex = this.zIndex;
      };
      UIBase.prototype.hide = function() {};
      UIBase.prototype.show = function() {};
      __decorate([ property() ], UIBase.prototype, "zIndex", void 0);
      UIBase = __decorate([ ccclass, disallowMultiple ], UIBase);
      return UIBase;
    }(cc.Component);
    exports.default = UIBase;
    cc._RF.pop();
  }, {} ],
  UIManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6687doIZMNNgJj1UjL9Qlh0", "UIManager");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GloableConstantUtils_1 = require("../tools/GloableConstantUtils");
    var ResourcesManager_1 = require("./ResourcesManager");
    var UIManager = function() {
      function UIManager() {}
      Object.defineProperty(UIManager.prototype, "Canvas", {
        get: function() {
          return this.canvas;
        },
        enumerable: true,
        configurable: true
      });
      UIManager.prototype.Init = function() {
        this.canvas = cc.Canvas.instance;
        this.uiDictionary = new Array();
      };
      UIManager.prototype.ShowUI = function(uiName, callBack, parent) {
        var _this = this;
        void 0 === callBack && (callBack = null);
        void 0 === parent && (parent = this.canvas.node);
        Logger.log("ShowUI " + uiName, "UIManager");
        if (void 0 == this.uiDictionary[uiName]) {
          this.uiDictionary[uiName] = null;
          ResourcesManager_1.ResourcesManager.Instance.loadRes(GloableConstantUtils_1.GloableConstantUtils.UIPrefabPath.concat(uiName), function(error, res) {
            if (null != error) {
              null != callBack && callBack(error, null);
              return;
            }
            var node = cc.instantiate(res);
            _this.uiDictionary[uiName] = node.getComponent(uiName);
            node.parent = parent;
            if (null == _this.uiDictionary[uiName]) {
              Logger.error('Get null component from the ui named "' + uiName + '"', "UIManager");
              null != callBack && callBack(new Error('Get null component from the ui named "' + uiName + '"'), null);
            } else {
              _this.uiDictionary[uiName].init();
              _this.uiDictionary[uiName].show();
              null != callBack && callBack(null, _this.uiDictionary[uiName]);
            }
          });
        } else if (null == this.uiDictionary[uiName]) {
          Logger.error('There are many places attempt to show the same UI "' + uiName + '"', "UIManager");
          null != callBack && callBack(new Error('There are many places attempt to show the same UI "' + uiName + '"'), null);
        } else {
          this.uiDictionary[uiName].show();
          null != callBack && callBack(null, this.uiDictionary[uiName]);
        }
      };
      UIManager.prototype.HideUI = function(uiName) {
        Logger.log("HideUI " + uiName, "UIManager");
        if (void 0 == this.uiDictionary[uiName] || null == this.uiDictionary[uiName]) return;
        this.uiDictionary[uiName].hide();
      };
      UIManager.prototype.GetUI = function(uiName) {
        return this.uiDictionary[uiName];
      };
      UIManager.prototype.DestroyUI = function(uiName) {
        if (void 0 != this.uiDictionary[uiName] && true == cc.isValid(this.uiDictionary[uiName])) {
          this.uiDictionary[uiName].node.destroy();
          this.uiDictionary[uiName] = void 0;
        }
      };
      UIManager.prototype.DestroyAll = function() {
        while (this.uiDictionary.length > 0) {
          var ui = this.uiDictionary.pop();
          null != ui && void 0 != ui && ui.node.destroy();
        }
        cc.loader.releaseAll();
      };
      UIManager.Instance = new UIManager();
      return UIManager;
    }();
    exports.UIManager = UIManager;
    cc._RF.pop();
  }, {
    "../tools/GloableConstantUtils": "GloableConstantUtils",
    "./ResourcesManager": "ResourcesManager"
  } ],
  UINameEnum: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e14066hHE9EwJUA9LGMMG2V", "UINameEnum");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UINameEnum;
    (function(UINameEnum) {
      UINameEnum["LOGIN_UI"] = "LoginUI";
      UINameEnum["LOADING_UI"] = "LoadingUI";
      UINameEnum["POP_UP_WARNING_UI"] = "PopupWarningUI";
      UINameEnum["MAIN_UI"] = "MainUI";
      UINameEnum["MAIN_UI_EQUIP_COMPONENT"] = "MainUIEquipComponent";
      UINameEnum["EDITE_UI"] = "EditUI";
      UINameEnum["DEFAULT"] = "null";
    })(UINameEnum = exports.UINameEnum || (exports.UINameEnum = {}));
    cc._RF.pop();
  }, {} ],
  ViewChangeData: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5e8f650DP9Amp5HyLr9+Aib", "ViewChangeData");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ViewChangeData = function() {
      function ViewChangeData() {}
      return ViewChangeData;
    }();
    exports.default = ViewChangeData;
    cc._RF.pop();
  }, {} ],
  ViewSyncSystem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c90276XGDNDMo2wUxG02arD", "ViewSyncSystem");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EcsUtility_1 = require("../utility/EcsUtility");
    var ViewChangeData_1 = require("../sharedComponent/ViewChangeData");
    var GloableUtils_1 = require("../../tools/GloableUtils");
    var PositionComponent_1 = require("../component/PositionComponent");
    var MotionControllerComponent_1 = require("../component/MotionControllerComponent");
    var MotionComponent_1 = require("../component/MotionComponent");
    var ViewSyncSystem = function(_super) {
      __extends(ViewSyncSystem, _super);
      function ViewSyncSystem() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      ViewSyncSystem.prototype.OnStart = function() {
        var _this = this;
        ECS.World.active.EntitisManager.addSharedComponent(ViewChangeData_1.default);
        EcsUtility_1.EcsUtility.InitedViewSyncSystem = false;
        EcsUtility_1.EcsUtility.RegisterViewSyncOpt = function() {
          return __awaiter(_this, void 0, void 0, function() {
            return __generator(this, function(_a) {
              switch (_a.label) {
               case 0:
                if (!(false == EcsUtility_1.EcsUtility.GotRole)) return [ 3, 2 ];
                return [ 4, GloableUtils_1.GloableUtils.Delay(500) ];

               case 1:
                _a.sent();
                return [ 3, 0 ];

               case 2:
                return [ 4, SimCivil.Contract.IViewSynchronizer.RegisterViewSync(function(viewChanged) {
                  ViewChangeData_1.default.instance.data = viewChanged;
                }) ];

               case 3:
                _a.sent();
                EcsUtility_1.EcsUtility.InitedViewSyncSystem = true;
                return [ 2 ];
              }
            });
          });
        }();
      };
      ViewSyncSystem.prototype.OnDestroy = function() {
        var _this = this;
        ECS.World.active.EntitisManager.removeSharedComponent(ViewChangeData_1.default);
        (function() {
          return __awaiter(_this, void 0, void 0, function() {
            return __generator(this, function(_a) {
              switch (_a.label) {
               case 0:
                return [ 4, SimCivil.Contract.IViewSynchronizer.DeregisterViewSync() ];

               case 1:
                _a.sent();
                return [ 2 ];
              }
            });
          });
        });
        EcsUtility_1.EcsUtility.InitedViewSyncSystem = false;
      };
      ViewSyncSystem.prototype.OnUpdate = function() {
        if (null != ViewChangeData_1.default.instance.data && null != this.positions && this.positions.length > 0) {
          this.positions[0].position = new cc.Vec2(ViewChangeData_1.default.instance.data.Position.Item1, ViewChangeData_1.default.instance.data.Position.Item2);
          this.motions[0].speed = ViewChangeData_1.default.instance.data.Speed;
        }
      };
      __decorate([ ECS.inject(MotionComponent_1.default) ], ViewSyncSystem.prototype, "motions", void 0);
      __decorate([ ECS.inject(PositionComponent_1.default) ], ViewSyncSystem.prototype, "positions", void 0);
      __decorate([ ECS.inject(MotionControllerComponent_1.default) ], ViewSyncSystem.prototype, "motionController", void 0);
      return ViewSyncSystem;
    }(ECS.ComponentSystem);
    exports.default = ViewSyncSystem;
    cc._RF.pop();
  }, {
    "../../tools/GloableUtils": "GloableUtils",
    "../component/MotionComponent": "MotionComponent",
    "../component/MotionControllerComponent": "MotionControllerComponent",
    "../component/PositionComponent": "PositionComponent",
    "../sharedComponent/ViewChangeData": "ViewChangeData",
    "../utility/EcsUtility": "EcsUtility"
  } ]
}, {}, [ "DirectionComponent", "GraphicComponent", "MotionComponent", "MotionControllerComponent", "PositionComponent", "SizeComponent", "TestComponent", "TestComponent2", "InputData", "MapDataComponent", "ViewChangeData", "InputSystem", "MapSystem", "MotionControllerSystem", "PlayerMotionSyncSystem", "RoleSystem", "ViewSyncSystem", "EcsUtility", "ComponentUINameEnum", "EventEnum", "JsonConfigNameEnum", "LocalStorageEnum", "MapCeilTypEnum", "SceneEnum", "StateEnum", "UINameEnum", "GameStateLogin", "GameStateMainNormal", "GameStateSceneLoading", "GameLauncher", "Npc", "Player", "EditableComponentUIManager", "GameManager", "LocalizationManager", "ResourcesManager", "UIManager", "MapCeil", "MovementTest", "GloableConstantUtils", "GloableUtils", "JsonConfigUtils", "TextLocalization", "UIAnimationUtils", "PopupWarningUI", "UIBase", "EditableComponentContainer", "EditableComponentContainerConfigure", "EditableComponentUI", "EditableComponentUIConfigure", "LoadingUI", "LoginUI", "MainUI", "MainUIEquipComponent" ]);