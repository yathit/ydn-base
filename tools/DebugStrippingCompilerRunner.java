package com.google.javascript.jscomp;

import com.google.javascript.rhino.Node;
import org.kohsuke.args4j.CmdLineException;

import com.google.common.collect.ImmutableSet;
import com.google.javascript.jscomp.CommandLineRunner;
import com.google.javascript.jscomp.CompilerOptions;
import com.google.javascript.jscomp.VariableRenamingPolicy;

import java.util.Map;

/**
 * DebugStrippingCompilerRunner is an extension of the Closure Compiler that
 * strips debugging information when ADVANCED_OPTIMIZATIONS is used.
 *
 * @author bolinfest@gmail.com (Michael Bolin)
 */
public class DebugStrippingCompilerRunner extends CommandLineRunner {

    private boolean is_debug = true;

    public DebugStrippingCompilerRunner(String[] args) throws CmdLineException {

        super(args);
        for (int i = 0; i < args.length; i++) {

            if (args[i].equals("--define=goog.DEBUG=false")) {
                //System.out.println("--define=goog.DEBUG=false");
                is_debug = false;
            } else if (args[i].equals("--define=goog.DEBUG=true")) {
                is_debug = true;
            }

        }
    }

    @Override
    protected CompilerOptions createOptions() {
        CompilerOptions options = super.createOptions();

        CommandLineConfig config = super.getCommandLineConfig();



        // Use this as a heuristic to determine whether ADVANCED_OPTIMIZATIONS is
        // being used -- cannot access FLAG_compilation_level because it is private
        // in CompilerRunner.
        boolean isAdvancedOptionsEnabled =
                options.variableRenaming == VariableRenamingPolicy.ALL;

        boolean isDebug = true;

        /*
        Map<String, Node> defines = options.getDefineReplacements();
        if (defines.containsKey("goog.DEBUG")) {
            System.out.println("containsKey goog.DEBUG");
            Node b = defines.get("goog.DEBUG");
            isDebug = b.getBooleanProp(0);
        }
        */
        // Above code to get goog.DEBUG doesn't work, so we are using heuristic again.
        isDebug = is_debug;

        // Only enable additional options when ADVANCED_OPTIMIZATIONS is specified
        // and goog.DEBUG is true
        if (isAdvancedOptionsEnabled && !isDebug) {
            applyDebugStrippingOptions(options);
        }

        return options;
    }

    static void applyDebugStrippingOptions(CompilerOptions options) {
        options.stripNameSuffixes = ImmutableSet.of("logger", "logger_");
        options.stripTypePrefixes = ImmutableSet.of("goog.asserts",
                "goog.debug", "ydn.debug"); //
        options.setIdGenerators(ImmutableSet.of("goog.events.getUniqueId"));
    }

    public static void main(String[] args) {
        try {
            (new DebugStrippingCompilerRunner(args)).run();
        } catch (CmdLineException e) {
            System.exit(-1);
        }
    }
}