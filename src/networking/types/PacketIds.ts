export enum HandshakingServerbound {
    Handshake,
    LegacyServerListPing = 0xfe,
}

export enum StatusClientbound {
    Response,
    Pong,
}

export enum StatusServerbound {
    Request,
    Ping,
}

export enum LoginClientbound {
    Disconnect,
    EncryptionRequest,
    LoginSuccess,
    SetCompression,
    LoginPluginRequest,
}

export enum LoginServerbound {
    LoginStart,
    EncryptionResponse,
    LoginPluginResponse,
}

export enum PlayClientbound {
    SpawnEntity,
    SpawnExperienceOrb,
    SpawnLivingEntity,
    SpawnPainting,
    SpawnPlayer,
    SculkVibrationSignal,
    EntityAnimation,
    Statistics,
    AcknowledgePlayerDigging,
    BlockBreakAnimation,
    BlockEntityData,
    BlockAction,
    BlockChange,
    BossBar,
    ServerDifficulty,
    ChatMessage,
    ClearTitles,
    TabComplete,
    DeclareCommands,
    CloseWindow,
    WindowItems,
    WindowProperty,
    SetSlot,
    SetCooldown,
    PluginMessage,
    NamedSoundEffect,
    Disconnect,
    EntityStatus,
    Explosion,
    UnloadChunk,
    ChangeGameState,
    OpenHorseWindow,
    InitializeWorldBorder,
    KeepAlive,
    ChunkData,
    Effect,
    Particle,
    UpdateLight,
    JoinGame,
    MapData,
    TradeList,
    EntityPosition,
    EntityPositionAndRotation,
    EntityRotation,
    VehicleMove,
    OpenBook,
    OpenWindow,
    OpenSignEditor,
    Ping,
    CraftRecipeResponse,
    PlayerAbilities,
    EndCombatEvent,
    EnterCombatEvent,
    DeathCombatEvent,
    PlayerInfo,
    FacePlayer,
    PlayerPositionAndLook,
    UnlockRecipes,
    DestroyEntity,
    RemoveEntityEffect,
    ResourcePackSend,
    Respawn,
    EntityHeadLook,
    MultiBlockChange,
    SelectAdvancementTab,
    ActionBar,
    WorldBorderCenter,
    WorldBorderLerpSize,
    WorldBorderSize,
    WorldBorderWarningDelay,
    WorldBorderWarningReach,
    Camera,
    HeldItemChange,
    UpdateViewPosition,
    UpdateViewDistance,
    SpawnPosition,
    DisplayScoreboard,
    EntityMetadata,
    AttachEntity,
    EntityVelocity,
    EntityEquipment,
    SetExperience,
    UpdateHealth,
    ScoreboardObjective,
    SetPassengers,
    Teams,
    UpdateScore,
    SetTitleSubTitle,
    TimeUpdate,
    SetTitleText,
    SetTitleTime,
    EntitySoundEffect,
    SoundEffect,
    StopSound,
    PlayerListHeaderAndFooter,
    NBTQueryResponse,
    CollectItem,
    EntityTeleport,
    Advancements,
    EntityProperties,
    EntityEffect,
    DeclareRecipes,
    Tags,
}

export enum PlayServerbound {
    TeleportConfirm,
    QueryBlockNBT,
    SetDifficulty,
    ChatMessage,
    ClientStatus,
    ClientSettings,
    TabComplete,
    ClickWindowButton,
    ClickWindow,
    CloseWindow,
    PluginMessage,
    EditBook,
    QueryEntityNBT,
    InteractEntity,
    GenerateStructure,
    KeepAlive,
    LockDifficulty,
    PlayerPosition,
    PlayerPositionAndRotation,
    PlayerRotation,
    PlayerMovement,
    VehicleMove,
    SteerBoat,
    PickItem,
    CraftRecipeRequest,
    PlayerAbilities,
    PlayerDigging,
    EntityAction,
    SteerVehicle,
    Pong,
    SetRecipeBookState,
    SetDisplayedRecipe,
    NameItem,
    ResourcePackStatus,
    AdvancementTab,
    SelectTrade,
    SetBeaconEffect,
    HeldItemChange,
    UpdateCommandBlock,
    UpdateCommandBlockMinecart,
    CreativeInventoryAction,
    UpdateJigsawBlock,
    UpdateStructureBlock,
    UpdateSign,
    Animation,
    Spectate,
    PlayerBlockPlacement,
    UseItem,
}
