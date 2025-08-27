import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { DxButtonModule, DxNumberBoxModule, DxSelectBoxModule } from 'devextreme-angular';


@Component({
  selector: 'app-game-options',
  standalone: true,
  imports: [
    DxButtonModule,
    DxNumberBoxModule,
    DxSelectBoxModule,
  ],
  templateUrl: './game-options.component.html',
  styleUrl: './game-options.component.css'
})

export class GameOptionsComponent implements OnInit {
  playersQty: number = 2;
  villains: any;
  villain: any;
  rawEncounterCards: any;

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.initVillains();
  }


  initVillains() {
    this.dataService.getEncounterCardsData().subscribe(
      {
        next: (response: any) => {
          this.rawEncounterCards = response;
          let encounterPacks: any[] = [];

          response = response.sort((a: any, b: any) => {
            return a.code.localeCompare(b.code);
          });

          response.forEach((card: any) => {
            if (card.type_code == 'villain' || card.type_code == 'main_scheme') {
              if (encounterPacks[card.card_set_code] == undefined) encounterPacks[card.card_set_code] = [];
              encounterPacks[card.card_set_code].card_set_code = card.card_set_code;
              encounterPacks[card.card_set_code].text = card.card_set_name;

              if (card.type_code == 'villain') {
                if (encounterPacks[card.card_set_code].villain_phases == undefined) encounterPacks[card.card_set_code].villain_phases = [];
                encounterPacks[card.card_set_code].villain_phases.push(card)
              }
              if (card.type_code == 'main_scheme') {
                if (encounterPacks[card.card_set_code].main_scheme == undefined) encounterPacks[card.card_set_code].main_scheme = [];
                if (this.initMainSchemes(card)) encounterPacks[card.card_set_code].main_scheme.push(card)

              }
            }
          });


          let mainSets: any[] = [];
          let modularSets: any[] = [];
          for (const key in encounterPacks) {
            const pack = encounterPacks[key];
            if (pack.main_scheme != undefined) {
              if (pack.villain_phases) {
                pack.villain_phases.forEach((villain_phase: any) => {
                  villain_phase.card_text = villain_phase.text;
                  villain_phase.text = villain_phase.name + ' ' + villain_phase.stage;
                });
              }
              mainSets.push(pack);
            }
            else {
              if (!pack.card_set_code.includes("_nemesis"))
                modularSets.push(pack);
            }
          }

          this.villains = mainSets;
        },
        error: (error: any) => {
          console.log("Error getting encounter cards data: ", error);
        },
      }
    );
  }

  initMainSchemes(card: any) {
    if (card.imagesrc != undefined) card.imagesrc = 'https://es.marvelcdb.com' + card.imagesrc;

    if (card.threat != undefined) {
      if (card.threat != undefined) card.threat = card.threat * this.playersQty;
      else card.threat = "-";
    }

    if (card.base_threat != undefined) card.base_threat = card.base_threat * this.playersQty;
    else card.base_threat = "-";

    if (card.escalation_threat != undefined) card.escalation_threat = card.escalation_threat * this.playersQty;
    else card.escalation_threat = "-";

    switch (card.card_set_code) {
      case "rhino":
        if (card.code == "01097") return true;
        else return false;
      case "klaw":
        if (card.code == "01116") return true;
        // else if (card.code == "01117") return true;
        else return false;
      case "ultron":
        if (card.code == "01137") return true;
        // else if (card.code == "01138") return true;
        // else if (card.code == "01139") return true;
        else return false;
      case "risky_business":
        if (card.code == "02004b") return true;
        // else if (card.code == "02005b") return true;
        else return false;
      case "mutagen_formula":
        if (card.code == "02017b") return true;
        // else if (card.code == "02018b") return true;
        else return false;
      case "crossbones":
        if (card.code == "04061") return true;
        // else if (card.code == "04062") return true;
        // else if (card.code == "04063") return true;
        else return false;
      case "absorbing_man":
        if (card.code == "04079") return true;
        else return false;
      case "taskmaster":
        if (card.code == "04096") return true;
        else return false;
      case "zola":
        if (card.code == "04112") return true;
        // else if (card.code == "04113") return true;
        else return false;
      case "red_skull":
        if (card.code == "04128") return true;
        // else if (card.code == "04129") return true;
        else return false;
      case "wrecking_crew":
        if (card.code == "07001") return true;
        else return false;
      case "kang":
        if (card.code == "11007") {
          card.imagesrc = 'https://hallofheroeslcg.com/wp-content/uploads/2020/09/kang-7b-kangs-arrival.png';
          return true;
        }
        // if (card.code == "11010b") return true;
        // if (card.code == "11011b") return true;
        // if (card.code == "11012b") return true;
        // if (card.code == "11013b") return true;
        else return false;
      case "brotherhood_of_badoon":
        if (card.code == "16061b") return true;
        // if (card.code == "16062b") return true;
        else return false;
      case "infiltrate_the_museum":
        if (card.code == "16073b") return true;
        else return false;
      case "escape_the_museum":
        if (card.code == "16082b") return true;
        // if (card.code == "16083b") return true;
        // if (card.code == "16084b") return true;
        else return false;
      case "nebula":
        if (card.code == "16091b") return true;
        // if (card.code == "16092b") return true;
        else return false;
      case "ronan":
        if (card.code == "16106b") return true;
        // if (card.code == "16107b") return true;
        else return false;
      case "ebony_maw":
        if (card.code == "21074") {
          card.imagesrc = 'https://hallofheroeslcg.com/wp-content/uploads/2021/08/e4b.jpg';
          return true;
        }
        // if (card.code == "21075") {
        //   card.imagesrc = 'https://hallofheroeslcg.com/wp-content/uploads/2021/08/e5b.jpg';
        //   return true;
        // }
        else return false;
      case "tower_defense":
        if (card.code == "21098") {
          card.imagesrc = 'https://hallofheroeslcg.com/wp-content/uploads/2021/08/t7b.jpg';
          return true;
        }
        if (card.code == "21099") {
          card.imagesrc = 'https://hallofheroeslcg.com/wp-content/uploads/2021/08/t8b.jpg';
          return true;
        }
        else return false;
      case "thanos":
        if (card.code == "21114") {
          card.imagesrc = 'https://hallofheroeslcg.com/wp-content/uploads/2021/08/t4b.jpg';
          return true;
        }
        // if (card.code == "21115") {
        //   card.imagesrc = 'https://hallofheroeslcg.com/wp-content/uploads/2021/08/t5b.jpg';
        //   return true;
        // }
        else return false;
      case "hela":
        if (card.code == "21138") {
          card.imagesrc = 'https://hallofheroeslcg.com/wp-content/uploads/2021/08/h3b.jpg';
          return true;
        }
        else return false;
      case "loki":
        if (card.code == "21165") {
          card.imagesrc = 'https://hallofheroeslcg.com/wp-content/uploads/2021/08/l6b.jpg';
          return true;
        }
        else return false;
      case "the_hood":
        if (card.code == "24004b") return true;
        // if (card.code == "24005b") return true;
        // if (card.code == "24006b") return true;
        else return false;
      case "sandman":
        if (card.code == "27064b") return true;
        else return false;
      case "venom":
        if (card.code == "27076b") return true;
        else return false;
      case "mysterio":
        if (card.code == "27087b") return true;
        // if (card.code == "27088b") return true;
        else return false;
      case "sinister_six":
        if (card.code == "27100b") return true;
        // if (card.code == "27101b") return true;
        else return false;
      case "venom_goblin":
        if (card.code == "27117a") return true;
        if (card.code == "27118a") return true;
        if (card.code == "27119a") return true;
        else return false;
      case "sabretooth":
        if (card.code == "32063b") {
          card.threat = '-';
          card.imagesrc = 'https://hallofheroeslcg.com/wp-content/uploads/2024/08/32063b.jpg';
          return true;
        }
        if (card.code == "32064b") return true;
        else return false;
      case "project_wideawake":
        if (card.code == "32087b") {
          card.threat = 5 * this.playersQty;
          card.imagesrc = 'https://hallofheroeslcg.com/wp-content/uploads/2024/08/32087b.jpg';
          return true;
        }
        else return false;
      case "master_mold":
        if (card.code == "32112b") return true;
        // if (card.code == "32113b") {
        //   card.imagesrc = 'https://hallofheroeslcg.com/wp-content/uploads/2024/08/32113b.jpg';
        //   return true;
        // }
        else return false;
      case "mansion_attack":
        if (card.code == "32126b") return true;
        if (card.code == "32127b") return true;
        if (card.code == "32128b") return true;
        if (card.code == "32129b") return true;
        else return false;
      case "magneto_villain":
        if (card.code == "32141b") return true;
        // if (card.code == "32142b") return true;
        // if (card.code == "32143b") return true;
        else return false;
      case "magog":
        if (card.code == "39002b") return true;
        else return false;
      case "spiral":
        if (card.code == "39015b") return true;
        else return false;
      case "mojo":
        if (card.code == "39025b") return true;
        else return false;
      case "morlock_siege":
        if (card.code == "40077b") return true;
        // if (card.code == "40078b") return true;
        else return false;
      case "on_the_run":
        if (card.code == "40103b") return true;
        // if (card.code == "40104b") return true;
        else return false;
      case "juggernaut":
        if (card.code == "40121b") return true;
        else return false;
      case "mister_sinister":
        if (card.code == "40139b") {
          card.threat = '-';
          card.imagesrc = 'https://hallofheroeslcg.com/wp-content/uploads/2023/08/40139b.jpg';
          return true;
        }
        if (card.code == "40140b") { //Phase 2B Flight
          card.imagesrc = 'https://hallofheroeslcg.com/wp-content/uploads/2023/08/40140b.jpg';
          return true;
        }
        if (card.code == "40141b") { //Phase 2B Super Strength
          card.imagesrc = 'https://hallofheroeslcg.com/wp-content/uploads/2023/08/40141b.jpg';
          return true;
        }
        if (card.code == "40142b") { //Phase 2B Telepathy
          card.imagesrc = 'https://hallofheroeslcg.com/wp-content/uploads/2023/08/40142b.jpg';
          return true;
        }
        // if (card.code == "40143b") { // Phase 3B
        //   card.imagesrc = 'https://hallofheroeslcg.com/wp-content/uploads/2023/08/40143b.jpg';
        //   return true;
        // }
        else return false;
      case "stryfe":
        if (card.code == "40166b") return true;
        // if (card.code == "40167b") return true;
        else return false;
      case "unus":
        if (card.code == "45062b") return true;
        else return false;
      case "four_horsemen":
        if (card.code == "45085b") return true;
        else return false;
      case "apocalypse":

        card.threat = this.rawEncounterCards.find((c: any) => c.code == "45101a").health * this.playersQty; //Easy
        // card.threat = this.rawEncounterCards.find((c: any) => c.code == "45101b").health * this.playersQty;
        // card.threat = this.rawEncounterCards.find((c: any) => c.code == "45102a").health * this.playersQty;
        // card.threat = this.rawEncounterCards.find((c: any) => c.code == "45102b").health * this.playersQty;

        if (card.code == "45103b") return true;
        else return false;
      case "dark_beast":
        if (card.code == "45121b") return true;
        else return false;
      case "en_sabah_nur":
        if (card.code == "45147b") return true;
        // if (card.code == "45148b") return true;
        else return false;
      case "black_widow_villain":

        card.escalation_threat = 1 * this.playersQty; //Easy
        // card.escalation_threat = 2 * this.playersQty;
        // card.escalation_threat = 3 * this.playersQty;

        if (card.code == "50067b") {
          card.imagesrc = 'https://hallofheroeslcg.com/wp-content/uploads/2025/03/50067b.jpg';
          return true;
        }
        else return false;
      case "batroc":
        if (card.code == "50087b") {
          card.imagesrc = 'https://hallofheroeslcg.com/wp-content/uploads/2025/03/50087b.jpg';
          return true;
        }
        // if (card.code == "50088b") {
        //   card.imagesrc = 'https://hallofheroeslcg.com/wp-content/uploads/2025/03/50088b.jpg';
        //   return true;
        // }
        // if (card.code == "50089b") {
        //   card.imagesrc = 'https://hallofheroeslcg.com/wp-content/uploads/2025/03/50089b.jpg';
        //   return true;
        // }
        else return false;
      case "m.o.d.o.k.":
        if (card.code == "50104b") {
          card.imagesrc = 'https://hallofheroeslcg.com/wp-content/uploads/2025/03/50104b.jpg';
          return true;
        }
        else return false;
      case "thunderbolts":
        if (card.code == "50130b") {
          card.imagesrc = 'https://hallofheroeslcg.com/wp-content/uploads/2025/03/50130b.jpg';
          return true;
        }
        else return false;
      case "baron_zemo":

        if (card.code == "50167b") {
          card.imagesrc = 'https://hallofheroeslcg.com/wp-content/uploads/2025/03/50167b.jpg';
          return true;
        }
        // if (card.code == "50168b") {
        //   card.threat = "-";
        //   card.imagesrc = 'https://hallofheroeslcg.com/wp-content/uploads/2025/03/50168b.jpg';
        //   return true;
        // }
        // if (card.code == "50169b") {
        //   card.imagesrc = 'https://hallofheroeslcg.com/wp-content/uploads/2025/03/50169b.jpg';
        //   return true;
        // }
        else return false;
      default:
        return false;
    }
  }

  onPlayersQtyChange(value: number) {
    this.playersQty = value;
    console.log("Players Quantity Changed: ", this.playersQty);
  }

  onEncounterSelected(value: string) {
    this.villain = this.villains.find((v: any) => v.card_set_code === value);
    console.log(this.villain);
  }

  onStartGame() {
    console.log("Game Started with Players Quantity: ", this.playersQty);
    // Logic to start the game can be added here
  }
}
