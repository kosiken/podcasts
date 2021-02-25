export interface Podcast {
  rss:                      string;
  description_original:     string;
  title_original:           string;
  publisher_original:       string;
  image?:                    string;

  id:                       string;

  total_episodes:           number;

  explicit_content:         boolean;

}

export interface PlayerAudio {
    src: string;
    typ: string;
    title: string;
    duration: number;
    episode: number;
  }
