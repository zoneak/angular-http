import { Component, OnInit } from '@angular/core';
import { CidadeService } from './cidade-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  cidades: any[] = [];

  constructor(private cidadeService: CidadeService){}

  ngOnInit() {
    this.consultar();
  }

  consultar() {
    this.cidadeService.consultar()
      .then(dados => {
        console.log(dados);
        this.cidades = dados;
      });
  }

  adicionar(nome: string) {
    this.cidadeService.adicionar({ nome: nome }) // poderia deixar só {{ nome }} pois é o mesmo nome da propriedade
      .then(cidade => {
        alert(`Cidade "${cidade.nome}" adicionada com código ${cidade.id}`);
        this.consultar();
      });
  }

  excluir(id: number) {
    this.cidadeService.excluir(id)
      .then(() => {
        alert("Cidade excluída com sucesso!");
        this.consultar();
      });
  }

  alterar(cidade: any) {
    this.cidadeService.alterar(cidade)
      .then(c => {
        alert(`Cidade alterada com sucesso para ${c.nome}`);
        this.consultar();
      })
      .catch(erro => {
        alert(erro);
      });
  }
}
