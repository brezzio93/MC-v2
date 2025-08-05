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
        if (card.code == "11007") return true;
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
        if (card.code == "21074") return true;
        // if (card.code == "21075") return true;
        else return false;
      case "tower_defense":
        if (card.code == "21098") return true;
        // if (card.code == "21099") return true;
        else return false;
      case "thanos":
        if (card.code == "21114") return true;
        // if (card.code == "21115") return true;
        else return false;
      case "hela":
        if (card.code == "21138") return true;
        else return false;
      case "loki":
        if (card.code == "21165") return true;
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
        if (card.code == "32064b") return true;
        else return false;
      case "project_wideawake":
        console.log(card.code)
        return true
        if (card.code == "11007") return true;
        else return false;
      case "master_mold":
        if (card.code == "32112b") return true;
        // if (card.code == "32113b") return true;
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
        if (card.code == "40078b") return true;
        else return false;
      case "on_the_run":
        if (card.code == "40103b") return true;
        if (card.code == "40104b") return true;
        else return false;
      case "juggernaut":
        if (card.code == "40121b") return true;
        else return false;
      case "mister_sinister":
        if (card.imagesrc != undefined && card.threat) {
          if (card.code == "11007") return true;
          else return false;
        }
        else return false;
      case "stryfe":
        if (card.code == "40166b") return true;
        if (card.code == "40167b") return true;
        else return false;
      case "unus":
        if (card.code == "45062b") return true;
        else return false;
      case "four_horsemen":
        if (card.code == "45085b") return true;
        else return false;
      case "apocalypse":
        if (card.code == "45103b") return true;
        else return false;
      case "dark_beast":
        if (card.code == "45121b") return true;
        else return false;
      case "en_sabah_nur":
        if (card.code == "45147b") return true;
        if (card.code == "45148b") return true;
        else return false;
      case "black_widow_villain":
        if (card.imagesrc != undefined && card.threat) {
          if (card.code == "50067b") return true;
          else return false;
        }
        else return false;
      case "batroc":
        if (card.imagesrc != undefined && card.threat) {
          if (card.code == "50087b") return true;
          if (card.code == "50088b") return true;
          if (card.code == "50089b") return true;
          else return false;
        }
        else return false;
      case "m.o.d.o.k.":
        if (card.imagesrc != undefined && card.threat) {
          if (card.code == "50104b") return true;
          else return false;
        }
        else return false;
      case "thunderbolts":
        if (card.imagesrc != undefined && card.threat) {
          if (card.code == "50130b") return true;
          else return false;
        }
        else return false;
      case "baron_zemo":
        if (card.imagesrc != undefined && card.threat) {
          if (card.code == "50167b") return true;
          if (card.code == "50168b") return true;
          if (card.code == "50169b") return true;
          else return false;
        }
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
