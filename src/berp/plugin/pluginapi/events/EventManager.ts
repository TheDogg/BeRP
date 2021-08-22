import { BeRP } from '../../../'
import { EventEmitter } from 'events'
import { ConnectionHandler } from 'src/berp/network'
import {
  PlayerJoin,
  PlayerLeft,
  PlayerInitialized,
  PlayerMessage,
  JsonReceived,
} from './events/index'
import { PluginApi } from '../pluginApi'

// TODO: Add event/data exchange from gametest to berp via a rawtext text packet

export class EventManager extends EventEmitter {
  private _berp: BeRP
  private _connection: ConnectionHandler
  private _pluginApi: PluginApi
  private _events = new Map<string, any>()
  constructor(berp: BeRP, connection: ConnectionHandler, pluginApi: PluginApi) {
    super()
    this._berp = berp
    this._connection = connection
    this._pluginApi = pluginApi
    this._registerEvents()
  }
  private _registerEvents(): void {
    const PlayerJoinEvent = new PlayerJoin(this, this._berp, this._connection, this._pluginApi)
    this._events.set('PlayerJoined', PlayerJoinEvent)
    const PlayerLeftEvent = new PlayerLeft(this, this._berp, this._connection, this._pluginApi)
    this._events.set('PlayerLeft', PlayerLeftEvent)
    const PlayerInitializedEvent = new PlayerInitialized(this, this._berp, this._connection, this._pluginApi)
    this._events.set('PlayerInitialized', PlayerInitializedEvent)
    const PlayerMessageEvent = new PlayerMessage(this, this._berp, this._connection, this._pluginApi)
    this._events.set('PlayerMessage', PlayerMessageEvent)
    const JsonReceivedEvent = new JsonReceived(this, this._berp, this._connection, this._pluginApi)
    this._events.set('JsonReceived', JsonReceivedEvent)
  }
}
