// Bridge design pattern

interface MediaPlayerImplementation {
  playerAudio(): void;
  playVideo(): void;
}

class WindowsMediaPlayer implements MediaPlayerImplementation {
  playerAudio(): void {
    console.log("Playing audio on windows media player");
  }
  playVideo(): void {
    console.log("Playing video on windows media player");
  }
}

class MacosMediaPlayer implements MediaPlayerImplementation {
  playerAudio(): void {
    console.log("Playing audio on Macos media player");
  }
  playVideo(): void {
    console.log("Playing video on Macos media player");
  }
}

abstract class MediaPlayerAbstraction {
  constructor(protected readonly _implementation: MediaPlayerImplementation) {}

  abstract playFile(): void;
}

class AudioPlayer extends MediaPlayerAbstraction {
  playFile(): void {
    this._implementation.playerAudio();
  }
}
class VideoPlayer extends MediaPlayerAbstraction {
  playFile(): void {
    this._implementation.playVideo();
  }
}

// Client code

let windowsAudioPlayer = new AudioPlayer(new WindowsMediaPlayer());
windowsAudioPlayer.playFile();

let macOsVideoPlayer = new VideoPlayer(new MacosMediaPlayer());
macOsVideoPlayer.playFile();

// Real World Implementation

interface Database {
  connect(): void;
  query(query: string): void;
  close(): void;
}

class PostgresSQLDatabase implements Database {
  connect(): void {
    console.log("Connecting to PostgresSql");
  }
  query(query: string): void {
    console.log(`Executing query: ${query}`);
  }
  close(): void {
    console.log("Closing conneciton");
  }
}

class MongoDbDatabase implements Database {
  connect(): void {
    console.log("Connecting to MongoDb");
  }
  query(query: string): void {
    console.log(`Executing query: ${query}`);
  }
  close(): void {
    console.log("Closing conneciton");
  }
}

abstract class DatabaseService {
  constructor(protected database: Database) {}

  abstract fetchData(query: string): void;
}

class ClientDatabaseService extends DatabaseService {
  fetchData(query: string): void {
    this.database.connect();
    this.database.query(query);
    this.database.close();
  }
}

// Client code
let postgresService = new ClientDatabaseService(new PostgresSQLDatabase());
let mongoService = new ClientDatabaseService(new MongoDbDatabase());

mongoService.fetchData("USERS");
