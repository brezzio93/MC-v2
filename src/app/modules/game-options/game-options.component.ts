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
  playersQty: number = 1;
  villains: any;
  villain: any;

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.initVillains();
    console.log("Game Options Component Initialized");
  }


  initVillains() {
    this.dataService.getEncounterCardsData().subscribe(
      {
        next: (response: any) => {
          let encounterPacks: any[] = [];

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
                encounterPacks[card.card_set_code].main_scheme.push(card)
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

  onPlayersQtyChange(value: number) {
    this.playersQty = value;
    console.log("Players Quantity Changed: ", this.playersQty);
  }

  onEncounterSelected(value: string) {
    this.villain = this.villains.find((v: any) => v.card_set_code === value);
    console.log("Selected Villain: ", this.villain);
  }

  onStartGame() {
    console.log("Game Started with Players Quantity: ", this.playersQty);
    // Logic to start the game can be added here
  }
}
