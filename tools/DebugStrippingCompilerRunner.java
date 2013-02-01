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

    public DebugStrippingCompilerRunner(String[] args) throws CmdLineException {
        super(args);
    }

    @Override
    protected CompilerOptions createOptions() {
        CompilerOptions options = super.createOptions();

        // Use this as a heuristic to determine whether ADVANCED_OPTIMIZATIONS is
        // being used -- cannot access FLAG_compilation_level because it is private
        // in CompilerRunner.
        boolean isAdvancedOptionsEnabled =
                options.variableRenaming == VariableRenamingPolicy.ALL;

        boolean isDebug = false;
        Map<String, Node> defines = options.getDefineReplacements();
        if (defines.containsKey("goog.DEBUG")) {
            Node b = defines.get("goog.DEBUG");
            isDebug = b.getBooleanProp(0);
        }

        // Only enable additional options when ADVANCED_OPTIMIZATIONS is specified
        // and goog.DEBUG is true
        System.out.print("to stripping");
        if (isAdvancedOptionsEnabled && !isDebug) {
            System.out.print("stripping apply");
            applyDebugStrippingOptions(options);
        }

        return options;
    }

    static void applyDebugStrippingOptions(CompilerOptions options) {
        options.stripNameSuffixes = ImmutableSet.of("logger", "logger_");
        options.stripTypePrefixes = ImmutableSet.of("goog.asserts"); // "goog.debug"
        //options.setDefineToBooleanLiteral("goog.DEBUG", false);
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