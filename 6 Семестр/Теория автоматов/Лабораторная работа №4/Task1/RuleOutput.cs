namespace Task1;

internal class RuleOutput
{
    public string Terminal { get; set; }
    public string Nonterminal { get; set; }

    public RuleOutput(string terminal, string nonterminal)
    {
        Nonterminal = nonterminal;
        Terminal = terminal;
    }

    public override string ToString() => Terminal + Nonterminal;
}
