import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {

    const [tela,setTela] = useState('menu')
    const [jogadorAtual, setJogadorAtual] = useState('');
    const [tabuleiro, setTabuleiro] = useState([])
    const [jogadasRestantes, setJogadasRestantes] = useState(0)
    const [ganhador, setGanhador] = useState('')

    function iniciarJogo(jogador){
        setJogadorAtual(jogador)
        setJogadasRestantes(9)
        setTabuleiro([
            ['','',''],
            ['','',''],
            ['','','']
        ])
        setTela('jogo')
    }
    
    function jogar(linha, coluna){
        tabuleiro[linha][coluna] = jogadorAtual
        setTabuleiro([...tabuleiro])

        setJogadorAtual(jogadorAtual === 'X'? 'O':'X')

        verificarGanhador(tabuleiro, linha,coluna)
    }

    function verificarGanhador(tabuleiro, linha, coluna){
        if(tabuleiro[linha][0] !== '' && tabuleiro[linha][0] === tabuleiro[linha][1] && tabuleiro[linha][1] === tabuleiro[linha][2]){
            return finalizarJogo(tabuleiro[linha][0])
        }
        if(tabuleiro[0][coluna] !== '' && tabuleiro[0][coluna] === tabuleiro[1][coluna] && tabuleiro[1][coluna] === tabuleiro[2][coluna]){
            return finalizarJogo(tabuleiro[0][coluna])
        }

        if(tabuleiro[0][0] !== '' && tabuleiro[0][0] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][2]){
            return finalizarJogo(tabuleiro[0][0])
        }

        if(tabuleiro[0][2] !== '' && tabuleiro[0][2] === tabuleiro[1][1] && tabuleiro[1][1] === tabuleiro[2][1]){
            return finalizarJogo(tabuleiro[0][0])
        }

        if(jogadasRestantes - 1 === 0){
            return finalizarJogo('')
        }
        setJogadasRestantes((jogadasRestantes - 1))
    }

    function finalizarJogo(jogador){
        setGanhador(jogador)
        setTela('ganhador')
    }
    switch(tela){
        case 'menu':
            return getTelaMenu()
        case 'jogo':
            return getTelaJogo()
        case 'ganhador':
            return getTelaGanhador()
    }
    function getTelaMenu(){
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Jogo da velha</Text>
                <Text style={styles.subtitulo}>Selecione o primeiro jogador</Text>
                <View style={styles.inlineItems}>
                    <TouchableOpacity style={styles.boxjogar} onPress={ () => iniciarJogo('X')}>
                        <Text style={styles.jogadorX}>X</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boxjogar} onPress={ () => iniciarJogo('O')}>
                        <Text style={styles.jogadorO}>O</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    function getTelaJogo(){
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Jogo da velha</Text>
                {
                    tabuleiro.map((linha,numeroLinha) =>{
                        return(
                            <View key={numeroLinha} style={styles.inlineItems}>
                                {
                                    linha.map((coluna, numeroColuna) =>{
                                        return(
                                            <TouchableOpacity disabled={coluna !==''} onPress={() => jogar(numeroLinha,numeroColuna)} key={numeroColuna}style={styles.boxjogar}>
                                                <Text style={coluna ==='X'? styles.jogadorX: styles.jogadorO}>{coluna}</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                        )
                    })
                }
                <TouchableOpacity style={styles.botaoMenu} onPress={() => setTela('menu')}>
                    <Text style={styles.textoBotaoMenu}>Voltar ao menu</Text>
                </TouchableOpacity>
            
            </View>
        );
    }
   
    function getTelaGanhador(){
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Jogo da velha</Text>
                <Text style={styles.subtitulo}>Resultado final</Text>
                {
                    ganhador === ''&&
                    <Text style={styles.ganhador}>Nenhum jogador</Text>
                }
                {
                    ganhador !== ''&&
                    <>
                        <Text>Ganhador</Text>
                        <View style={styles.boxjogar} disabled={true}>
                            <Text style={ganhador ==='X'? styles.jogadorX: styles.jogadorO}>{ganhador}</Text>
                        </View>
                    </>
                }
                <TouchableOpacity style={styles.botaoMenu} onPress={() => setTela('menu')}>
                    <Text style={styles.textoBotaoMenu}>Voltar ao menu</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo:{
    fontSize:30,
    fontWeight:'bold',
    color:'#333'
  },
  subtitulo:{
    fontSize:20,
    color:'#555',
    marginTop:20
  },
  boxjogar:{
    width:80,
    height:80,
    backgroundColor:'#eee',
    display:"flex",
    alignItems:"center",
    justifyContent:'center',
    margin:5
  },
  jogadorX:{
    fontSize:40,
    color:'#553fda'
  },
  jogadorO:{
    fontSize:40,
    color:'#da3f3f'
  },
  inlineItems:{
    display:'flex',
    flexDirection:'row'
  },
  botaoMenu:{
    marginTop:20
  },
  textoBotaoMenu:{
    color:'#4e6fe4'
  },
  ganhador:{
    fontSize:30,
    fontWeight:'bold',
    color:'#333'
  }
});
