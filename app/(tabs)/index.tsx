import React, { useState } from "react";
import { Button, Text, TextInput, View, ScrollView, StyleSheet } from "react-native";

export default function Index() {
  const [valorFinanciamento, setValorFinanciamento] = useState("");
  const [quantidadeParcelas, setQuantidadeParcelas] = useState("");
  const [taxaJurosAnual, setTaxaJurosAnual] = useState("");
  const [outrasTaxas, setOutrasTaxas] = useState("");
  const [resultado, setResultado] = useState("");

  const calcular = () => {
    const valor = parseFloat(valorFinanciamento);
    const parcelas = parseInt(quantidadeParcelas);
    const taxaAnual = parseFloat(taxaJurosAnual);
    const taxasExtras = parseFloat(outrasTaxas);

    if (
      isNaN(valor) ||
      isNaN(parcelas) ||
      isNaN(taxaAnual) ||
      isNaN(taxasExtras)
    ) {
      setResultado("Por favor, preencha todos os campos corretamente.");
      return;
    }

    const taxaMensal = Math.pow(1 + taxaAnual / 100, 1 / 12) - 1;
    const valorParcela =
      (valor * taxaMensal) / (1 - Math.pow(1 + taxaMensal, -parcelas));
    const totalPago = valorParcela * parcelas;
    const jurosPagos = totalPago - valor;
    const jurosComTaxas = jurosPagos + taxasExtras;

    const resultadoTexto = `
Valor da Parcela: R$ ${valorParcela.toFixed(2)}
Total Pago: R$ ${totalPago.toFixed(2)}
Juros Pagos: R$ ${jurosPagos.toFixed(2)}
Juros com Taxas: R$ ${jurosComTaxas.toFixed(2)}
    `;

    setResultado(resultadoTexto);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}> Calculadora de Financiamento</Text>

      <Text style={styles.label}>Valor do Financiamento:</Text>
      <TextInput
        value={valorFinanciamento}
        onChangeText={setValorFinanciamento}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Número de Parcelas:</Text>
      <TextInput
        value={quantidadeParcelas}
        onChangeText={setQuantidadeParcelas}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Taxa de Juros (% ao ano):</Text>
      <TextInput
        value={taxaJurosAnual}
        onChangeText={setTaxaJurosAnual}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Outras Taxas (R$):</Text>
      <TextInput
        value={outrasTaxas}
        onChangeText={setOutrasTaxas}
        keyboardType="numeric"
        style={styles.input}
      />

      <View style={styles.buttonContainer}>
        <Button title="Calcular" color="#d63384" onPress={calcular} />
      </View>

      {resultado ? (
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>📊 Resultado:</Text>
          <Text style={styles.resultText}>{resultado}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff0f5", 
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#c2185b",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#6a1b9a",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d63384",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    marginVertical: 10,
  },
  resultBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#ffe6f0",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ff69b4",
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ad1457",
    marginBottom: 10,
  },
  resultText: {
    fontSize: 16,
    color: "#4a148c",
    lineHeight: 24,
  },
});
